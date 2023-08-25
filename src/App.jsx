import { Routes, Route } from "react-router-dom";
import { lazy } from "react";
import Layout from "./components/Layout";

const NewsPage = lazy(() => import("./pages/NewsPage"));
const EditNewsPage = lazy(() => import("./pages/EditNewsPage"));
const NewNewsPage = lazy(() => import("./pages/NewNewsPage"));

const ColleaguesPage = lazy(() => import("./pages/ColleaguesPage"));
const EditColleaguePage = lazy(() => import("./pages/EditColleaguePage"));
const NewColleaguePage = lazy(() => import("./pages/NewColleaguePage"));

const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const GalleryByThemePage = lazy(() => import("./pages/GalleryByThemePage"));

const ContactsPage = lazy(() => import("./pages/ContactsPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const PublicationsPage = lazy(() => import("./pages/PublicationsPage"));
const ResearchPage = lazy(() => import("./pages/ResearchPage"));

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="publications/:period" element={<PublicationsPage />} />
        <Route path="research" element={<ResearchPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="gallery/:theme" element={<GalleryByThemePage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="news/new" element={<NewNewsPage />} />
        <Route path="news/:id/edit" element={<EditNewsPage />} />
        <Route path="colleagues" element={<ColleaguesPage />} />
        <Route path="colleagues/new" element={<NewColleaguePage />} />
        <Route path="colleagues/:id/edit" element={<EditColleaguePage />} />
        <Route path="contacts" element={<ContactsPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
