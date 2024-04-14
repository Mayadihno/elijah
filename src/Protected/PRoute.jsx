import { Navigate, Outlet } from "react-router-dom";
import UseAuth from "./UseAuth";

const PRoute = () => {
  const { loggedIn, loading } = UseAuth();

  if (loading) {
    return "Loading....";
  }
  return loggedIn ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PRoute;
