import { Routes, Route } from "react-router-dom";
import { lazy } from "react";
import Layout from "./components/Layout";

const ColleaguesPage = lazy(() => import("./pages/ColleaguesPage"));
const ContactsPage = lazy(() => import("./pages/ContactsPage"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const NewsPage = lazy(() => import("./pages/NewsPage"));
const PublicationsPage = lazy(() => import("./pages/PublicationsPage"));
const ResearchPage = lazy(() => import("./pages/ResearchPage"));

// import ColleaguesPage from "./pages/ColleaguesPage";
// import ContactsPage from "./pages/ContactsPage";
// import GalleryPage from "./pages/GalleryPage";
// import HomePage from "./pages/HomePage";
// import NewsPage from "./pages/NewsPage";
// import PublicationsPage from "./pages/PublicationsPage";
// import ResearchPage from "./pages/ResearchPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="publications/:period" element={<PublicationsPage />} />
        <Route path="research" element={<ResearchPage />} />
        <Route path="gallery/:theme" element={<GalleryPage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="colleagues" element={<ColleaguesPage />} />
        <Route path="contacts" element={<ContactsPage />} />
      </Route>
    </Routes>
  );
};

export default App;
