import { Navigate } from "react-router-dom";
import Loader from "../components/Loader";
import useParentAuth from "../context/auth/useParentAuth";

const ParentPrivateRoutes = ({ children }) => {
  const { parent, parentAuthUser } = useParentAuth();

  if (parentAuthUser === false && parent === null)
    return <Navigate to={"/route-not-found"} />;

  if (parentAuthUser === undefined || parent === null) {
    return <Loader />; // or loading spinner, etc...
  }

  // if (parent === null) return <Navigate to="/route-not-found" />;

  // if (parentAuthUser === undefined || Object.keys(parent).length === 0) {
  //   return <Loader />; // or loading spinner, etc...
  // }

  return children;
};

export default ParentPrivateRoutes;
