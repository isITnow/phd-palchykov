const confirmationDialog = async (callback, message = 'Are you sure?') => {
  if (window.confirm(message) === true) {
    try {
      await callback();
    } catch (error) {
      console.error('Confirmation callback:', error);
    }
  }
};

export default confirmationDialog;
