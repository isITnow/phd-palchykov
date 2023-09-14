const errorSwitchCase = (error) => {
  switch (error.response.status) {
    case 401:
      return error.response.data.error_description.join(", ");

    case 400:
    case 404:
    case 422:
      return error.response.data.error;

    default:
      return error.message;
  }
};

export default errorSwitchCase;
