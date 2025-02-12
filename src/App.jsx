import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';

import Layout from './layouts/Layout';
import NotFoundPage from './pages/NotFoundPage';
import PrivateRoute from './components/shared/PrivateRoute';

import navTabs from './assets/navTabs';
import useRefreshAuth from './hooks/useRefreshAuth';

const ColleaguesPage = lazy(() => import('./pages/colleagues/ColleaguesPage'));
const ColleagueOperationsPage = lazy(() =>
  import('./pages/colleagues/ColleagueOperationsPage')
);

const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const PhotoAlbumPage = lazy(() => import('./pages/PhotoAlbumPage'));
const PhotoAlbumOperationsPage = lazy(() =>
  import('./pages/PhotoAlbumOperationsPage')
);

const NewsPage = lazy(() => import('./pages/news/NewsPage'));
const NewsOperationsPage = lazy(() =>
  import('./pages/news/NewsOperationsPage')
);

const PostsPage = lazy(() => import('./pages/posts/PostsPage'));
const PostPage = lazy(() => import('./pages/posts/PostPage'));

const PublicationsPage = lazy(() =>
  import('./pages/publications/PublicationsPage')
);
const PublicationOperationsPage = lazy(() =>
  import('./pages/publications/PublicationOperationsPage')
);

const ResearchPage = lazy(() => import('./pages/research/ResearchPage'));
const CreateResearchPage = lazy(() =>
  import('./pages/research/CreateResearchPage')
);
const EditResearchPage = lazy(() =>
  import('./pages/research/EditResearchPage')
);
const EditIllustrationPage = lazy(() =>
  import('./pages/research/EditIllustrationPage')
);

const ContactsPage = lazy(() => import('./pages/ContactsPage'));
const HomePage = lazy(() => import('./pages/HomePage'));

const App = () => {
  useRefreshAuth();

  return (
    <Routes>
      <Route path={navTabs.root.path} element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path={navTabs.colleagues.path} element={<ColleaguesPage />} />
        <Route path={navTabs.contacts.path} element={<ContactsPage />} />
        <Route path={navTabs.gallery.path} element={<GalleryPage />} />
        <Route
          path={navTabs.gallery.photoAlbumPath()}
          element={<PhotoAlbumPage />}
        />
        <Route path={navTabs.news.path} element={<NewsPage />} />
        <Route
          path={navTabs.publications.path()}
          element={<PublicationsPage />}
        />
        <Route path={navTabs.posts.path} element={<PostsPage />} />
        <Route path={navTabs.posts.postPath()} element={<PostPage />} />
        <Route path={navTabs.researches.path} element={<ResearchPage />} />

        {/* PRIVATE ROUTES */}
        <Route path={navTabs.root.path} element={<PrivateRoute />}>
          <Route
            path={navTabs.publications.createPath()}
            element={<PublicationOperationsPage />}
          />
          <Route
            path={navTabs.publications.editPath()}
            element={<PublicationOperationsPage edit />}
          />
          <Route
            path={navTabs.gallery.createPhotoAlbumPath}
            element={<PhotoAlbumOperationsPage />}
          />
          <Route
            path={navTabs.gallery.editPhotoAlbumPath()}
            element={<PhotoAlbumOperationsPage edit />}
          />
          <Route
            path={navTabs.researches.createPath}
            element={<CreateResearchPage />}
          />
          <Route
            path={navTabs.researches.editPath()}
            element={<EditResearchPage />}
          />
          <Route
            path={navTabs.researches.editIllustrationPath()}
            element={<EditIllustrationPage />}
          />
          <Route
            path={navTabs.news.createPath}
            element={<NewsOperationsPage />}
          />
          <Route
            path={navTabs.news.editPath()}
            element={<NewsOperationsPage />}
          />
          <Route
            path={navTabs.colleagues.createPath}
            element={<ColleagueOperationsPage />}
          />
          <Route
            path={navTabs.colleagues.editPath()}
            element={<ColleagueOperationsPage />}
          />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
