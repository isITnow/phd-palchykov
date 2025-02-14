import { fireToastNotification } from "./fireToastNotification";
import getErrorMessage from "./getErrorMessage";

const operationsErrorHandler = (rejectWithValue, error) => {
  const errorMessage = getErrorMessage(error);
  if (errorMessage !== "canceled request") {
    fireToastNotification.error(errorMessage);
  }
  return rejectWithValue(errorMessage);
};

export default operationsErrorHandler;
