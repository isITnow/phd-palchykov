import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import galleryThemes from "../../assets/data/galleryThemes.js";

const GalleryByTheme = () => {
  const { theme } = useParams();
  const [list, setList] = useState([]);
  useEffect(() => {
    const data = galleryThemes.find((item) => item.theme === theme).list;
    setList(data);
  }, [theme]);
  return (
    <div>
      <Link to={"/gallery"}>back to gallery</Link>
      <h4>{theme}</h4>
    </div>
  );
};

export default GalleryByTheme;
