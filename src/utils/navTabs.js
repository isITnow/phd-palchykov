const navTabs = {
  collaborators: {
    id: 6,
    title: 'Collaborations',
    path: '/collaborators',
    createPath: '/collaborators/new',
    editPath: (id = ':id') => `/collaborators/${id}/edit`,
  },
  contacts: {
    id: 8,
    title: 'Contacts',
    path: '/contacts',
  },
  gallery: {
    id: 4,
    title: 'Gallery',
    path: '/gallery',
    createPhotoAlbumPath: '/gallery/photo_albums/new',
    editPhotoAlbumPath: (id = ':id') => `/gallery/photo_albums/${id}/edit`,
    photoAlbumPath: (id = ':id') => `/gallery/photo_albums/${id}`,
  },
  news: {
    id: 5,
    title: 'News',
    path: '/news',
    createPath: '/news/new',
    editPath: (id = ':id') => `/news/${id}/edit`,
  },
  posts: {
    id: 7,
    title: 'Blog',
    path: '/posts',
    postPath: (id = ':id') => `/posts/${id}`,
  },
  publications: {
    id: 3,
    title: 'Publications',
    path: (id = ':periodId') => `/periods/${id}/publications`,
    createPath: (id = ':periodId') => `/periods/${id}/publications/new`,
    editPath: (periodId = ':periodId', publicationId = ':publicationId') =>
      `/periods/${periodId}/publications/${publicationId}/edit`,
  },
  researches: {
    id: 2,
    title: 'Research',
    path: '/researches',
    createPath: '/researches/new',
    editPath: (id = ':id') => `/researches/${id}/edit`,
    editIllustrationPath: (researchId = ':researchId', id = ':id') =>
      `/researches/${researchId}/illustrations/${id}/edit`,
  },
  root: {
    id: 1,
    title: 'Home',
    path: '/',
  },
};

export default navTabs;
