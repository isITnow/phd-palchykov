import { useEffect } from "react";

import getLastWordIfMoreThanOne from "../../utils/getLastWordIfMoreThanOne";

const useRejectedDeletedAlertEffect = (
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
    if (status === "deleted") {
      const text = `${cardName} ${getLastWordIfMoreThanOne(status)}`;
      showAlert(text, "success");
      return;
    }
  }, [error, status, showAlert, cardName]);
};

export default useRejectedDeletedAlertEffect;
