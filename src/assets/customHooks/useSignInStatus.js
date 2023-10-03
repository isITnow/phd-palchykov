import { useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectToken,
  // selectUserRole,
} from "../../redux/auth/selectorAuth";

const useSignInStatus = () => {
  const tokenStatus = useSelector(selectToken);
  const logInStatus = useSelector(selectIsLoggedIn);
  const isLoggedIn = tokenStatus && logInStatus;
  // const role = useSelector(selectUserRole);
  // const isAdmin = role === "admin";
  return isLoggedIn;
};

export default useSignInStatus;
