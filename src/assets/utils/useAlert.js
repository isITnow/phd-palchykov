import { useState } from "react";

const initState = { text: "", type: "", isVisible: false };

export const useAlert = () => {
  const [alert, setAlert] = useState(initState);
  const showAlert = (text, type) => {
    setAlert({ text, type, isVisible: true });
    setTimeout(() => {
      setAlert(initState);
    }, 5000);
  };

  return { alert, showAlert };
};
