import useIsLoggedIn from "../../hooks/useIsLoggedIn";

const IsLoggedIn = ({ children }) => {
  const isLoggedIn = useIsLoggedIn();

  return isLoggedIn && children;
};

export default IsLoggedIn;
