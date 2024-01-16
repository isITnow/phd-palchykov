const navTabs = {
  colleagues: {
    id: 6,
    title: "Colleagues",
    path: "/colleagues",
    createPath: "/colleagues/new",
    editPath: (id = ":id") => `/colleagues/${id}/edit`,
  },
  contacts: {
    id: 8,
    title: "Contacts",
    path: "/contacts",
  },
  gallery: {
    id: 4,
    title: "Gallery",
    path: "/gallery",
    createPhotoAlbumPath: "/gallery/photo_albums/new",
    editPhotoAlbumPath: (id = ":id") => `/gallery/photo_albums/${id}/edit`,
    photoAlbumPath: (id = ":id") => `/gallery/photo_albums/${id}`,
  },
  news: {
    id: 5,
    title: "News",
    path: "/news",
    createPath: "/news/new",
    editPath: (id = ":id") => `/news/${id}/edit`,
  },
  posts: {
    id: 7,
    title: "Blog",
    path: "/posts",
    postPath: (id = ":id") => `/posts/${id}`,
  },
  publications: {
    id: 3,
    title: "Publications",
    path: (id = ":period_id") => `/periods/${id}/publications`,
    createPath: (id = ":period_id") => `/periods/${id}/publications/new`,
    editPath: (period_id = ":period_id", publication_id = ":publication_id") =>
      `/periods/${period_id}/publications/${publication_id}/edit`,
  },
  researches: {
    id: 2,
    title: "Research",
    path: "/researches",
    createPath: "/researches/new",
    editPath: (id = ":id") => `/researches/${id}/edit`,
    editIllustrationPath: (research_id = ":research_id", id = ":id") =>
      `/researches/${research_id}/illustrations/${id}/edit`,
  },
  root: {
    id: 1,
    title: "Home",
    path: "/",
  },
};

export default navTabs;
