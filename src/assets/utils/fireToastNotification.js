import { toast } from "react-toastify";

const success = (response, status, message = "Success") => {
  if (response.status === status) {
    toast.success(message);
  }
};

const error = (message = "Fail") => toast.error(message);

export const fireToastNotification = {
  success,
  error,
};
