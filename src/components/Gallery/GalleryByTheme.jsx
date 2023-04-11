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
      <ul className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
        {list.map((img) => (
          <li key={img} className="col mb-3">
            <img src="..." alt="..." />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GalleryByTheme;
