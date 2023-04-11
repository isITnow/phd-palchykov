import { Link } from "react-router-dom";
import galleryThemes from "../../assets/data/galleryThemes.js";
// import s from "./gallery.module.css"

const Gallery = () => {
  return (
    <ul>
      {galleryThemes.map(({ theme, list }) => (
        <li key={theme}>
          <Link to={theme}>{theme}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Gallery;
