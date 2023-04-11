import { Link } from "react-router-dom";
import galleryThemes from "../../assets/data/galleryThemes.js";
import s from "./gallery.module.css";

const Gallery = () => {
  return (
    <ul className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
      {galleryThemes.map(({ theme, list }) => (
        <li key={theme} className={`col mb-3`}>
          <Link to={theme}>
            <div className={`card ${s.hoverEffect}`}>
              <img src="..." className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title text-center">{theme}</h5>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Gallery;
