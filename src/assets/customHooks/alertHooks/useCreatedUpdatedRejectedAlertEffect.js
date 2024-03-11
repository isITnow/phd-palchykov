import { useEffect } from "react";

import getLastWordIfMoreThanOne from "../../utils/getLastWordIfMoreThanOne";

const useCreatedUpdatedRejectedAlertEffect = (
  error,
  status,
  showAlert,
  cardName = "Card"
) => {
  useEffect(() => {
    if (status === "rejected") {
      showAlert(error, "danger");
      return;
    }
    if (status === "created" || status === "updated") {
      const text = `${cardName} ${getLastWordIfMoreThanOne(status)}`;
      showAlert(text, "success");
      return;
    }
  }, [error, status, showAlert, cardName]);
};

export default useCreatedUpdatedRejectedAlertEffect;
