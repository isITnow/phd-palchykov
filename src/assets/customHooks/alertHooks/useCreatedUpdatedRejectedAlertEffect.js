import { useEffect } from "react";
import { toast } from "react-toastify";

import getLastWordIfMoreThanOne from "../../utils/getLastWordIfMoreThanOne";

const useCreatedUpdatedRejectedAlertEffect = (
  error,
  status,
  cardName = "Card"
) => {
  useEffect(() => {
    if (status === "rejected") {
      toast.error(error);
      return;
    }
    if (status === "created" || status === "updated") {
      const text = `${cardName} ${getLastWordIfMoreThanOne(status)}`;
      toast.success(text);
      return;
    }
  }, [error, status, cardName]);
};

export default useCreatedUpdatedRejectedAlertEffect;
