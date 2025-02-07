import useLocalStorage from "./useLocalStorage";

const useIsLoggedIn = () => {
  const { getItem } = useLocalStorage("auth");

  return Boolean(getItem());
};

export default useIsLoggedIn;
