const confirmationDialog = (operation, message = "Are you sure?") => {
  if (window.confirm(message) === true) {
    operation();
  }
};

export default confirmationDialog;
