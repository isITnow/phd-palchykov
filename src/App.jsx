import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Homepage from "./pages/Homepage";
import Publications from "./pages/Publications";
import Research from "./pages/Research";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="publications" element={<Publications />} />
        <Route path="research" element={<Research />} />
      </Route>
    </Routes>
  );
};

export default App;
