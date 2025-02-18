const setPageTitle = (pathname) => {
  const baseTitle = 'Prof. Dr. Palchykov';
  let currentPage = null;

  if (pathname.includes('researches')) {
    currentPage = 'Research';
  } else if (pathname.includes('publications')) {
    currentPage = 'Publications';
  } else if (pathname.includes('gallery')) {
    currentPage = 'Gallery';
  } else if (pathname.includes('news')) {
    currentPage = 'News';
  } else if (pathname.includes('collaborators')) {
    currentPage = 'Collaborations';
  } else if (pathname.includes('posts')) {
    currentPage = 'Blog';
  } else if (pathname.includes('contacts')) {
    currentPage = 'Contacts';
  } else {
    currentPage = null;
  }

  document.title = currentPage
    ? `${currentPage} | ${baseTitle}`
    : (document.title = baseTitle);
};

export default setPageTitle;
