import Button from "@mui/material/Button";
import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function Login() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = React.useState({ username: "", password: "" });

  React.useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, []);

  const login = async () => {
    await auth.login({ ...form });
    navigate("/", { replace: false });
  };

  const handleClick = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      username:{" "}
      <input value={form.username} name="username" onChange={handleClick} />
      password:{" "}
      <input
        value={form.password}
        name="password"
        onChange={handleClick}
        type="password"
      />
      <Button onClick={login}>Login</Button>
    </>
  );
}

export default Login;
