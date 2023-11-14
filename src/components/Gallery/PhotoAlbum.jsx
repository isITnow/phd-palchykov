import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";

import s from "./gallery.module.css";

const PhotoAlbum = ({ photoAlbum }) => {
  const { pictures_list } = photoAlbum;
  return (
    <>
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
    </>
  );
};

export default PhotoAlbum;
