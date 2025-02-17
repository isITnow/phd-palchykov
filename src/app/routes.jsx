import { lazy } from 'react';
import navTabs from '@/utils/navTabs';

const ColleaguesPage = lazy(() => import('@/pages/colleagues/ColleaguesPage'));
const ColleagueOperationsPage = lazy(() =>
  import('@/pages/colleagues/ColleagueOperationsPage')
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
  { path: navTabs.colleagues.path, element: <ColleaguesPage /> },
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
  { path: navTabs.colleagues.createPath, element: <ColleagueOperationsPage /> },
  { path: navTabs.colleagues.editPath(), element: <ColleagueOperationsPage /> },
];
