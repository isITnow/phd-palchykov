import { useDispatch, useSelector } from "react-redux";
import { removePictureThunk } from "../../redux/gallery/operationsGallery";
import { selectStatus } from "../../redux/gallery/selectorGallery";

import "photoswipe/dist/photoswipe.css";
import { CgClose } from "react-icons/cg";
import { Gallery, Item } from "react-photoswipe-gallery";

import useSignInStatus from "../../assets/customHooks/useSignInStatus";
import s from "./gallery.module.css";

const PhotoAlbum = ({ photoAlbum }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSignInStatus();
  const status = useSelector(selectStatus);
  const { pictures_list } = photoAlbum;

  const isDisabled = status === "pending";

  const handleClick = (id) => {
    dispatch(removePictureThunk(id));
  };

  return (
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
                    className={`rounded-1 shadow position-relative ${s.imgWrapper}`}
                  >
                    {isLoggedIn && (
                      <button
                        disabled={isDisabled}
                        type="button"
                        className="
                        btn btn-danger
                        d-flex
                        justify-content-center
                        rounded-circle
                        p-1
                        position-absolute
                        translate-middle
                        top-0 start-100
                        "
                        onClick={() => handleClick(id)}
                      >
                        <CgClose size={"1rem"} color="white" />
                      </button>
                    )}
                    <img
                      ref={ref}
                      onClick={open}
                      src={picture_url}
                      alt={filename}
                      className={`rounded-1 ${s.img}`}
                    />
                  </div>
                )}
              </Item>
            </div>
          );
        })}
      </div>
    </Gallery>
  );
};

export default PhotoAlbum;
