import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { removeCommentThunk } from "../../redux/comments/operationsComments";

import "photoswipe/dist/photoswipe.css";
import { Gallery, Item } from "react-photoswipe-gallery";

import formateDate from "../../assets/utils/formateDate";
import IsLoggedIn from "../shared/IsLoggedIn";

const Comment = ({ comment }) => {
  const { author, body, id: commentId, comment_image } = comment;
  // eslint-disable-next-line no-unused-vars
  const { postedDate, _, __ } = formateDate(comment);
  const { id } = useParams();
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeCommentThunk({ post_id: id, comment_id: commentId }));
  };

  return (
    <div className="py-3">
      <span className="fw-bold text-primary">{author}</span>
      <p className="mt-2 text-break">{body}</p>
      {comment_image && (
        <div className="row mb-2">
          <div className="col-md-6 col-lg-3">
            <Gallery>
              <Item
                original={comment_image.image_url}
                thumbnail={comment_image.comment_image_url}
                width={comment_image.metadata.width}
                height={comment_image.metadata.height}
              >
                {({ ref, open }) => (
                  <img
                    className="img-fluid rounded-1"
                    alt=""
                    ref={ref}
                    onClick={open}
                    src={comment_image.image_url}
                  />
                )}
              </Item>
            </Gallery>
          </div>
        </div>
      )}
      <div className="d-flex justify-content-between align-items-end">
        <small className="text-secondary">{postedDate}</small>
        <IsLoggedIn>
          <button
            type="button"
            className="btn btn-sm btn-danger"
            onClick={handleDelete}
          >
            Delete
          </button>
        </IsLoggedIn>
      </div>
    </div>
  );
};

export default Comment;
