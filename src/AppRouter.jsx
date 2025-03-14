import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from '@/layouts/Layout';
import Loader from '@/components/shared/Loader';
import NotFoundPage from '@/pages/NotFoundPage';

import navTabs from '@/utils/navTabs';

const CollaboratorsPage = lazy(() =>
  import('@/pages/collaborators/CollaboratorsPage')
);
const CollaboratorOperationsPage = lazy(() =>
  import('@/pages/collaborators/CollaboratorOperationsPage')
);

const GalleryPage = lazy(() => import('@/pages/gallery/GalleryPage'));
const PhotoAlbumPage = lazy(() => import('@/pages/gallery/PhotoAlbumPage'));
const PhotoAlbumOperationsPage = lazy(() =>
  import('@/pages/gallery/PhotoAlbumOperationsPage')
);

const NewsPage = lazy(() => import('@/pages/news/NewsPage'));
const NewsOperationsPage = lazy(() =>
  import('@/pages/news/NewsOperationsPage')
);

const PostsPage = lazy(() => import('@/pages/posts/PostsPage'));
const PostPage = lazy(() => import('@/pages/posts/PostPage'));

const PublicationsPage = lazy(() =>
  import('@/pages/publications/PublicationsPage')
);
const PublicationOperationsPage = lazy(() =>
  import('@/pages/publications/PublicationOperationsPage')
);

const ResearchPage = lazy(() => import('@/pages/research/ResearchPage'));
const CreateResearchPage = lazy(() =>
  import('@/pages/research/CreateResearchPage')
);
const EditResearchPage = lazy(() =>
  import('@/pages/research/EditResearchPage')
);
const EditIllustrationPage = lazy(() =>
  import('@/pages/research/EditIllustrationPage')
);

const ContactsPage = lazy(() => import('@/pages/ContactsPage'));
const HomePage = lazy(() => import('@/pages/HomePage'));

export const publicRoutes = [
  { path: navTabs.root.path, element: <HomePage /> },
  { path: navTabs.collaborators.path, element: <CollaboratorsPage /> },
  { path: navTabs.contacts.path, element: <ContactsPage /> },
  { path: navTabs.gallery.path, element: <GalleryPage /> },
  { path: navTabs.gallery.photoAlbumPath(), element: <PhotoAlbumPage /> },
  { path: navTabs.news.path, element: <NewsPage /> },
  { path: navTabs.publications.path(), element: <PublicationsPage /> },
  { path: navTabs.posts.path, element: <PostsPage /> },
  { path: navTabs.posts.postPath(), element: <PostPage /> },
  { path: navTabs.researches.path, element: <ResearchPage /> },
];

export const privateRoutes = [
  {
    path: navTabs.publications.createPath(),
    element: <PublicationOperationsPage />,
  },
  {
    path: navTabs.publications.editPath(),
    element: <PublicationOperationsPage />,
  },
  {
    path: navTabs.gallery.createPhotoAlbumPath,
    element: <PhotoAlbumOperationsPage />,
  },
  {
    path: navTabs.gallery.editPhotoAlbumPath(),
    element: <PhotoAlbumOperationsPage />,
  },
  { path: navTabs.researches.createPath, element: <CreateResearchPage /> },
  { path: navTabs.researches.editPath(), element: <EditResearchPage /> },
  {
    path: navTabs.researches.editIllustrationPath(),
    element: <EditIllustrationPage />,
  },
  { path: navTabs.news.createPath, element: <NewsOperationsPage /> },
  { path: navTabs.news.editPath(), element: <NewsOperationsPage /> },
  {
    path: navTabs.collaborators.createPath,
    element: <CollaboratorOperationsPage />,
  },
  {
    path: navTabs.collaborators.editPath(),
    element: <CollaboratorOperationsPage />,
  },
];

const AppRouter = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path={navTabs.root.path} element={<Layout />}>
            {/* PUBLIC ROUTES */}
            {publicRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}

            {/* PRIVATE ROUTES */}
            {privateRoutes.map(({ element, path }) => (
              <Route element={element} key={path} path={path} />
            ))}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
