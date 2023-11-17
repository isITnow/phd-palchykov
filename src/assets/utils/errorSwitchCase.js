const errorSwitchCase = (error) => {
  switch (error.response?.status) {
    case 401:
    case 400:
    case 404:
    case 422:
      return error.response?.data?.error || error.message;

    default:
      return error.message || "Error occurred";
  }
};

export default errorSwitchCase;
