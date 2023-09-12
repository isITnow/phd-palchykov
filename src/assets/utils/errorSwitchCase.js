const errorSwitchCase = (error) => {
  switch (error.response.status) {
    case 401:
      return error.response.data.error_description.join(", ");

    case 404 || 400:
      return error.response.data.error;

    default:
      return error.message;
  }
};

export default errorSwitchCase;
