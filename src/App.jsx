import { Routes, Route } from "react-router-dom";
import { lazy } from "react";
import Layout from "./components/Layout";

const ColleaguesPage = lazy(() => import("./pages/ColleaguesPage"));
const ContactsPage = lazy(() => import("./pages/ContactsPage"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const GalleryByThemePage = lazy(() => import("./pages/GalleryByThemePage"));
// const HomePage = lazy(() => import("./pages/HomePage"));
const NewsPage = lazy(() => import("./pages/NewsPage"));
const PublicationsPage = lazy(() => import("./pages/PublicationsPage"));
const ResearchPage = lazy(() => import("./pages/ResearchPage"));

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* <Route index element={<HomePage />} /> */}
        <Route path="publications/:period" element={<PublicationsPage />} />
        <Route path="research" element={<ResearchPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="gallery/:theme" element={<GalleryByThemePage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="colleagues" element={<ColleaguesPage />} />
        <Route path="contacts" element={<ContactsPage />} />
      </Route>
    </Routes>
  );
};

export default App;
