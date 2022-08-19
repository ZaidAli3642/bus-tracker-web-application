import { Outlet, Navigate } from "react-router-dom";
import useAuth from "./../context/auth/useAuth";

const PrivateRoutes = () => {
  const { authUser, user } = useAuth();

  if (authUser === undefined || user === null) {
    return null; // or loading spinner, etc...
  }

  return authUser ? <Outlet /> : <Navigate to="/admin/register" />;
};

export default PrivateRoutes;
