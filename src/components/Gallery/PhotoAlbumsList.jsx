import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import listItemMotionOptions from "../../assets/utils/motionOptions";
import s from "./gallery.module.css";

const PhotoAlbumsList = ({ photoAlbums }) => {
  return (
    <ul className="row row-cols-2 row-cols-md-3 row-cols-lg-4 mb-0">
      {photoAlbums.map(({ id, cover_image_url, title }, indx) => (
        <motion.li
          key={id}
          className="col mb-3"
          initial="initial"
          animate="animate"
          transition="transition"
          exit="exit"
          variants={listItemMotionOptions}
        >
          <Link to={`/gallery/photo_albums/${id}`}>
            <div className={`card overflow-hidden ${s.hoverEffect}`}>
              <div className={s.imgWrapper}>
                <img src={cover_image_url} className={s.img} alt={title} />
              </div>
              <div className="card-body">
                <h5 className="card-title text-center">{title}</h5>
              </div>
            </div>
          </Link>
        </motion.li>
      ))}
    </ul>
  );
};

export default PhotoAlbumsList;
