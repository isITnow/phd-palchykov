const getErrorMessage = (error) => {
  if (error.name === "CanceledError") {
    return "canceled request";
  }

  switch (error.response?.status) {
    case 401:
      return error.response?.data || error.message;

    case 400:
    case 404:
    case 422:
      return error.response?.data?.error || error.message;

    default:
      return error.message || "Error occurred";
  }
};

export default getErrorMessage;
