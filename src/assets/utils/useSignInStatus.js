import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectToken } from "../../redux/auth/selectorAuth";

const useSignInStatus = () => {
  const tokenStatus = useSelector(selectToken);
  const logInStatus = useSelector(selectIsLoggedIn);
  const isLoggedIn = tokenStatus && logInStatus;
  return isLoggedIn;
};

export default useSignInStatus;
