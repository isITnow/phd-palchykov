import { Navigate, Outlet } from "react-router-dom";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";

const PrivateRoute = () => {
  const isLoggedIn = useIsLoggedIn();

  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
