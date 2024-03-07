import { useState, useCallback } from "react";

const initState = { text: "", type: "", isVisible: false };

export const useAlert = () => {
  const [alert, setAlert] = useState(initState);

  const showAlert = useCallback(
    (text, type) => {
      setAlert({ text, type, isVisible: true });
      setTimeout(() => {
        setAlert(initState);
      }, 5000);
    },
    [setAlert]
  );

  return { alert, showAlert };
};
