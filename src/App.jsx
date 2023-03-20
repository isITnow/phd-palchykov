import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ContactsPage from "./pages/ContactsPage";
import HomePage from "./pages/HomePage";
import PublicationsPage from "./pages/PublicationsPage";
import ResearchPage from "./pages/ResearchPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="publications/:period" element={<PublicationsPage />} />
        <Route path="research" element={<ResearchPage />} />
        <Route path="contacts" element={<ContactsPage />} />
      </Route>
    </Routes>
  );
};

export default App;
