import { Link } from "react-router-dom";
import galleryThemes from "../../assets/data/galleryThemes.js";
import s from "./gallery.module.css";

const PhotoAlbumsList = () => {
  return (
    <ul className="row row-cols-2 row-cols-md-3 row-cols-lg-4 mb-0">
      {galleryThemes.map(({ theme, list }, indx) => (
        <li key={indx} className="col mb-3">
          <Link to={theme}>
            <div className={`card overflow-hidden ${s.hoverEffect}`}>
              <div className={s.imgWrapper}>
                <img
                  src={require(`../../assets/images/gallery/${theme}/${list[0].filename}`)}
                  className={s.img}
                  alt={`${list[0].filename}`}
                />
              </div>
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

export default PhotoAlbumsList;
