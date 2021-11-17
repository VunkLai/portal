import { styled } from "@mui/material/styles";
import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const Root = styled("div")(({ theme }) => ({}));

const Wrapper = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  padding: theme.spacing(3),
}));

function Authentication() {
  return (
    <Root>
      <NavBar />
      <Wrapper>
        <Outlet />
      </Wrapper>
    </Root>
  );
}

export default Authentication;
