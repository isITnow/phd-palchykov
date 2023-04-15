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
      <div className="d-flex flex-wrap justify-content-end justify-content-lg-between align-items-center mb-4">
        <h4 className="text-end text-lg-center text-secondary fw-bold mb-0">
          {theme}
        </h4>
        <Link className="btn btn-link fw-bold" to={"/gallery"}>
          back to gallery
        </Link>
      </div>

      <ul className="row row-cols-1 row-cols-md-2 row-cols-lg-3 align-items-center mb-0">
        {list.map((img, indx) => (
          <li key={indx} className="col mb-3">
            <img
              src={require(`../../assets/images/gallery/${theme}/${img.trim()}`)}
              alt={img}
              className="img-fluid"
            />
          </li>
        ))}
      </ul>
      <div className="text-end">
        <Link className="btn btn-link fw-bold" to={"/gallery"}>
          back to gallery
        </Link>
      </div>
    </div>
  );
};

export default GalleryByTheme;
