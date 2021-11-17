import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Suspense from "./components/loading/Suspense";
import SingleColumn from "./layouts/SingleColumn";

const CostCenter = Suspense(lazy(() => import("./pages/CostCenter")));

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
];

export default routers;
