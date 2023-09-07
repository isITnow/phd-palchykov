import { Routes, Route } from "react-router-dom";
import { lazy, useEffect } from "react";
import Layout from "./components/Layout";
import PrivateRoute from "./components/shared/PrivateRoute";
import { useSelector, useDispatch } from "react-redux";

import { selectToken } from "./redux/auth/selectorAuth";
import { refreshUserThunk } from "./redux/auth/operationsAuth";

const ColleaguesPage = lazy(() => import("./pages/ColleaguesPage"));
const ColleagueOperationsPage = lazy(() =>
  import("./pages/ColleagueOperationsPage")
);

const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const GalleryByThemePage = lazy(() => import("./pages/GalleryByThemePage"));

const NewsPage = lazy(() => import("./pages/NewsPage"));
const NewsOperationsPage = lazy(() => import("./pages/NewsOperationsPage"));

const PostsPage = lazy(() => import("./pages/PostsPage"));

const PublicationsPage = lazy(() => import("./pages/PublicationsPage"));
const PublicationOperationsPage = lazy(() =>
  import("./pages/PublicationOperationsPage")
);

const ResearchPage = lazy(() => import("./pages/ResearchPage"));
const ResearchOperationsPage = lazy(() =>
  import("./pages/ResearchOperationsPage")
);

const ContactsPage = lazy(() => import("./pages/ContactsPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const App = () => {
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(refreshUserThunk());
    }
  }, [dispatch, token]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="colleagues" element={<ColleaguesPage />} />
        <Route path="contacts" element={<ContactsPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="gallery/:theme" element={<GalleryByThemePage />} />
        <Route path="news" element={<NewsPage />} />
        <Route
          path="periods/:period_id/publications"
          element={<PublicationsPage />}
        />
        <Route path="posts" element={<PostsPage />} />
        <Route path="posts/:id" />
        <Route path="research" element={<ResearchPage />} />

        {/* PRIVATE ROUTES */}
        <Route path="/" element={<PrivateRoute />}>
          <Route
            path="periods/:period_id/publications/new"
            element={<PublicationOperationsPage />}
          />
          <Route
            path="periods/:period_id/publications/:publication_id/edit"
            element={<PublicationOperationsPage edit />}
          />
          <Route path="research/new" element={<ResearchOperationsPage />} />
          <Route path="news/new" element={<NewsOperationsPage />} />
          <Route path="news/:id/edit" element={<NewsOperationsPage edit />} />
          <Route path="colleagues/new" element={<ColleagueOperationsPage />} />
          <Route
            path="colleagues/:id/edit"
            element={<ColleagueOperationsPage edit />}
          />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
