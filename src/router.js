import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Suspense from "./components/loading/Suspense";
import Authentication from "./layouts/Authentication";
import SingleColumn from "./layouts/SingleColumn";

const CostCenter = Suspense(lazy(() => import("./pages/CostCenter")));

const Register = Suspense(lazy(() => import("./pages/auth/Register")));
const Login = Suspense(lazy(() => import("./pages/auth/Login")));
const ChangePassword = Suspense(
  lazy(() => import("./pages/auth/ChangePassword"))
);

const routers = [
  {
    path: "/",
    element: <Navigate to="/cost_center" replace={true} />,
  },
  {
    path: "/cost_center",
    element: <SingleColumn />,
    children: [{ path: "", element: <CostCenter /> }],
  },
  {
    path: "/auth",
    element: <Authentication />,
    children: [
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "change-password", element: <ChangePassword /> },
    ],
  },
];

export default routers;
