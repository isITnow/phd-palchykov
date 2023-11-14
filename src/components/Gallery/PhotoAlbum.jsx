import { Link } from "react-router-dom";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";

import s from "./gallery.module.css";

const PhotoAlbum = ({ photoAlbum }) => {
  const { title, pictures_list } = photoAlbum;
  return (
    <>
      {/* TODO change flex to flex-column */}
      <div className="d-flex flex-wrap justify-content-end justify-content-lg-between align-items-center mb-4">
        <h4 className="text-end text-lg-center text-secondary fw-bold mb-0">
          {title}
        </h4>
        <Link className="btn btn-link fw-bold" to={"/gallery"}>
          back to gallery
        </Link>
      </div>
      <Gallery withCaption>
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 align-items-center mb-0">
          {pictures_list.map((picture) => {
            const {
              id,
              filename,
              picture_url,
              metadata: { width, height },
            } = picture;
            return (
              <div key={id} className="col mb-3">
                <Item
                  original={picture_url}
                  thumbnail={picture_url}
                  width={width}
                  height={height}
                  // caption={caption ? caption : null}
                >
                  {({ ref, open }) => (
                    <div
                      className={`rounded-1 overflow-hidden shadow ${s.imgWrapper}`}
                    >
                      <img
                        ref={ref}
                        onClick={open}
                        src={picture_url}
                        alt={filename}
                        className={s.img}
                      />
                    </div>
                  )}
                </Item>
              </div>
            );
          })}
        </div>
      </Gallery>
      <div className="text-end">
        <Link className="btn btn-link fw-bold" to={"/gallery"}>
          back to gallery
        </Link>
      </div>
    </>
  );
};

export default PhotoAlbum;
