const setPageTitle = (pageTitle) => {
  const baseTitle = "Prof. Dr. Palchykov";
  if (pageTitle) {
    return (document.title = `${pageTitle} | ${baseTitle}`);
  }

  return (document.title = baseTitle);
};

export default setPageTitle;
