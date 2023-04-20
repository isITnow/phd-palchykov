import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import galleryThemes from "../../assets/data/galleryThemes.js";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";

import s from "./gallery.module.css";

const GalleryByTheme = () => {
  const { theme } = useParams();
  const [list, setList] = useState([]);

  useEffect(() => {
    const data = galleryThemes.find((item) => item.theme === theme).list;
    setList(data);
  }, [theme]);

  return (
    <>
      {/* TODO change flex to flex-column */}
      <div className="d-flex flex-wrap justify-content-end justify-content-lg-between align-items-center mb-4">
        <h4 className="text-end text-lg-center text-secondary fw-bold mb-0">
          {theme}
        </h4>
        <Link className="btn btn-link fw-bold" to={"/gallery"}>
          back to gallery
        </Link>
      </div>
      <Gallery withCaption>
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 align-items-center mb-0">
          {list.map((item, indx) => {
            const {
              filename,
              size: { width, hight },
              caption,
            } = item;
            return (
              <div key={indx} className="col mb-3">
                <Item
                  original={require(`../../assets/images/gallery/${theme}/${filename.trim()}`)}
                  thumbnail={require(`../../assets/images/gallery/${theme}/${filename.trim()}`)}
                  width={width}
                  height={hight}
                  caption={caption ? caption : null}
                >
                  {({ ref, open }) => (
                    <div
                      className={`rounded-1 overflow-hidden shadow ${s.imgWrapper}`}
                    >
                      <img
                        ref={ref}
                        onClick={open}
                        src={require(`../../assets/images/gallery/${theme}/${filename.trim()}`)}
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

export default GalleryByTheme;
