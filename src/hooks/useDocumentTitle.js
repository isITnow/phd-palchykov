import { useEffect } from 'react';
import { useParams, useMatch } from 'react-router-dom';

const useDocumentTitle = () => {
  const { pathname } = useParams();

  const matchCollaborators = useMatch('/collaborators/*');
  const matchContacts = useMatch('/contacts/*');
  const matchGallery = useMatch('/gallery/*');
  const matchNews = useMatch('/news/*');
  const matchPost = useMatch('/posts/:id');
  const matchPosts = useMatch('/posts');
  const matchPublications = useMatch('/periods/:id/publications/*');
  const matchResearches = useMatch('/researches/*');

  useEffect(() => {
    const baseTitle = 'Prof. Dr. Palchykov';
    let currentPage = null;

    if (matchResearches) {
      currentPage = 'Research';
    } else if (matchPublications) {
      currentPage = 'Publications';
    } else if (matchGallery) {
      currentPage = 'Gallery';
    } else if (matchNews) {
      currentPage = 'News';
    } else if (matchCollaborators) {
      currentPage = 'Collaborations';
    } else if (matchPosts) {
      currentPage = 'Blog';
    } else if (matchPost) {
      currentPage = 'Post';
    } else if (matchContacts) {
      currentPage = 'Contacts';
    } else {
      currentPage = null;
    }

    document.title = currentPage ? `${currentPage} | ${baseTitle}` : baseTitle;
  }, [
    matchCollaborators,
    matchContacts,
    matchGallery,
    matchNews,
    matchPost,
    matchPosts,
    matchPublications,
    matchResearches,
    pathname,
  ]);
};

export default useDocumentTitle;
