import { Outlet, Navigate } from "react-router-dom";
import useAuth from "./../context/auth/useAuth";
import Loader from "./../components/Loader";

const PrivateRoutes = ({
  notFoundRoute = "/not-found",
  navigateRoute = "/admin/register",
}) => {
  const { authUser, user } = useAuth();

  if (authUser === false && Object.keys(user).length === 0)
    return <Navigate to={notFoundRoute} />;

  if (authUser === undefined || Object.keys(user).length === 0) {
    return <Loader />; // or loading spinner, etc...
  }

  return authUser ? <Outlet /> : <Navigate to={navigateRoute} />;
};

export default PrivateRoutes;
