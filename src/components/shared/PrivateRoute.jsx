import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectToken } from "../../redux/auth/selectorAuth";

const PrivateRoute = () => {
  const tokenStatus = useSelector(selectToken);

  return tokenStatus ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
