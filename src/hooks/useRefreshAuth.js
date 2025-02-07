import { useMutation } from "@tanstack/react-query";

import { authApi } from "../services/authApi";
import { tokenOperations } from "../services/http";
import isTokenExpired from "../assets/utils/isTokenExpired";
import useLocalStorage from "./useLocalStorage";

const useRefreshAuth = () => {
  const { getItem, removeItem } = useLocalStorage("auth");
  const { mutateAsync: mutateLogout } = useMutation({
    mutationFn: authApi.logoutUser,
  });

  const authData = getItem();

  if (!authData?.token) return;

  const isExpired = isTokenExpired(authData.token);

  if (isExpired) {
    tokenOperations.unset();
    removeItem();
    mutateLogout();
    return;
  }

  tokenOperations.set(authData.token);
};

export default useRefreshAuth;
