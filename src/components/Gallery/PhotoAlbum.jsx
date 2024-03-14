import { useDispatch, useSelector } from "react-redux";
import { removePictureThunk } from "../../redux/gallery/operationsGallery";
import { selectStatus } from "../../redux/gallery/selectorGallery";

import { Button, Col, Row } from "react-bootstrap";
import { CgClose } from "react-icons/cg";

import "photoswipe/dist/photoswipe.css";
import { Gallery, Item } from "react-photoswipe-gallery";

import IsLoggedIn from "../shared/IsLoggedIn";

import confirmationDialog from "../../assets/utils/confirmationDialog";
import s from "./gallery.module.css";

const PhotoAlbum = ({ photoAlbum }) => {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const { pictures_list } = photoAlbum;

  const isDisabled = status === "pending";

  const handleDelete = (id) => {
    confirmationDialog(
      () => dispatch(removePictureThunk(id)),
      "Are you sure you want to delete?"
    );
  };

  return (
    <Gallery withCaption>
      <Row xs={2} md={3} lg={4} className="align-items-center mb-0">
        {pictures_list.map((picture) => {
          const {
            filename,
            id,
            metadata: { width, height },
            picture_url,
          } = picture;
          return (
            <Col key={id} className="mb-3">
              <Item
                height={height}
                original={picture_url}
                thumbnail={picture_url}
                width={width}
              >
                {({ ref, open }) => (
                  <div
                    className={`rounded-1 shadow position-relative ${s.imgWrapper}`}
                  >
                    <IsLoggedIn>
                      <Button
                        disabled={isDisabled}
                        type="button"
                        variant="danger"
                        className="
                        d-flex
                        justify-content-center
                        rounded-circle
                        p-1
                        position-absolute
                        translate-middle
                        top-0 start-100
                        "
                        onClick={() => handleDelete(id)}
                      >
                        <CgClose size={"1rem"} color="white" />
                      </Button>
                    </IsLoggedIn>
                    <img
                      alt={filename}
                      className={`rounded-1 ${s.img}`}
                      onClick={open}
                      ref={ref}
                      src={picture_url}
                    />
                  </div>
                )}
              </Item>
            </Col>
          );
        })}
      </Row>
    </Gallery>
  );
};

export default PhotoAlbum;
