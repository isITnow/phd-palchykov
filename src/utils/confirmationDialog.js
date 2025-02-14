const confirmationDialog = (callback, message = 'Are you sure?') => {
  if (window.confirm(message) === true) {
    callback();
  }
};

export default confirmationDialog;
