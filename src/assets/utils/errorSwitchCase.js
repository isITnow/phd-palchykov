const errorSwitchCase = (error) => {
  switch (error.response.status) {
    case 401:
      return error.response.data.error || error.response.data;

    case 400:
    case 404:
    case 422:
      return error.response.data.error || error.response.data;

    default:
      return error.message;
  }
};

export default errorSwitchCase;
