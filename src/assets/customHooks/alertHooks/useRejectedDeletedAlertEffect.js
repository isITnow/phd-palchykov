import { useEffect } from "react";
import { toast } from "react-toastify";

import getLastWordIfMoreThanOne from "../../utils/getLastWordIfMoreThanOne";

const useRejectedDeletedAlertEffect = (error, status, cardName = "Card") => {
  useEffect(() => {
    if (status === "rejected") {
      toast.error(error);
      return;
    }
    if (status === "deleted") {
      const text = `${cardName} ${getLastWordIfMoreThanOne(status)}`;
      toast.success(text);
      return;
    }
  }, [error, status, cardName]);
};

export default useRejectedDeletedAlertEffect;
