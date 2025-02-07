import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import useLocalStorage from "../../../hooks/useLocalStorage";
import { authApi } from "../../../services/authApi";

const useAuth = () => {
  const [modalShow, setModalShow] = useState(false);
  const { removeItem } = useLocalStorage("auth");

  const { mutateAsync: mutateLogout } = useMutation({
    mutationFn: authApi.logoutUser,
    onSuccess: () => {
      removeItem();
    },
  });

  return { modalShow, setModalShow, mutateLogout };
};

export default useAuth;
