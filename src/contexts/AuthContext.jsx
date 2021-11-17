import { createContext, useEffect, useReducer } from "react";
import api from "../apis/auth";

/*
interface User {
  name: string,
  email: string,
  role: Unique[ROLES],
  accessToken: string,
  refreshToken: string
}

const ROLES = {
  GUEST: 0,
  REPORTER: 1,
  DEVELOPER: 2,
  MAINTAINER: 3,
};
*/

const initialAuth = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
  server: "http://localhost:8000",
};

const handler = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isInitialized: true,
      isAuthenticated,
      user,
      server: `${window.location.protocol}//${window.location.hostname}:8000`,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;
    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  REFRESH: (state, action) => {
    const { user } = action.payload;
    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state, action) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  },
  CHANGE_PASSWORD: (state, action) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  },
};

const reducer = (state, action) => {
  return handler[action.name] ? handler[action.name](state, action) : state;
};

export const AuthContext = createContext({
  ...initialAuth,
  register: (username, password) => Promise.resolve(),
  login: (username, password) => Promise.resolve(),
  refresh: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  changePassword: (password, newPassword) => Promise.resolve(),
});

export function AuthProvider(props) {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialAuth);

  useEffect(() => {
    const initialize = async () => {
      try {
        const user = window.sessionStorage.getItem("user");
        if (user) {
          const data = JSON.parse(user);
          dispatch({
            name: "INITIALIZE",
            payload: {
              isAuthenticated: true,
              user: {
                name: data.username,
                email: data.email,
                accessToken: data.access_token,
                refreshToken: data.refresh_token,
                expireTS: data.expire_ts,
              },
            },
          });
        } else {
          dispatch({
            name: "INITIALIZE",
            payload: { isAuthenticated: false, user: null },
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    initialize();
  }, []);

  const register = async (username, password) => {
    try {
      const response = await api.register(state.server, username, password);
      console.log("register", response);
    } catch (err) {
      console.error("register", err);
    }
  };

  const login = async (username, password) => {
    console.log("login");
    try {
      const user = await api.login(state.server, username, password);
      window.sessionStorage.setItem("user", JSON.stringify(user));
      dispatch({ name: "LOGIN", payload: { user } });
      console.log("login", user);
    } catch (err) {
      console.error("login", err);
    }
  };

  const refresh = async () => {
    if (state.isAuthenticated) {
      try {
        const { accessToken, refreshToken } = state.user;
        const user = await api.refreshToken(
          state.server,
          accessToken,
          refreshToken
        );
        window.sessionStorage.setItem("user", JSON.stringify(user));
        dispatch({ name: "REFRESH", payload: { user } });
        console.log("refresh", user);
      } catch (err) {
        console.error("refresh", err);
      }
    }
  };

  const logout = async () => {
    if (state.isAuthenticated) {
      try {
        const response = await api.logout(state.server, state.user.accessToken);
        window.sessionStorage.removeItem("user");
        dispatch({ name: "LOGOUT" });
        console.log("logout", response);
      } catch (err) {
        console.error("logout", err);
      }
    }
  };

  const changePassword = async (password, newPassword) => {
    if (state.isAuthenticated) {
      try {
        const response = await api.changePassword(
          state.server,
          state.user.accessToken,
          password,
          newPassword
        );
        window.sessionStorage.removeItem("user");
        dispatch({ name: "CHANGE_PASSWORD" });
        console.log("changePassword", response);
      } catch (err) {
        console.error("change-password", err);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        register,
        login,
        refresh,
        logout,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
