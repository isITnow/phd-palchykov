import useSignInStatus from "../../assets/customHooks/useSignInStatus";

const IsLoggedIn = ({ children }) => {
  const isLoggedIn = useSignInStatus();

  return <>{isLoggedIn && children}</>;
};

export default IsLoggedIn;
