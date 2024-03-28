import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { removeCommentThunk } from "../../redux/comments/operationsComments";

import "photoswipe/dist/photoswipe.css";
import { Button, Col, Row } from "react-bootstrap";
import { Gallery, Item } from "react-photoswipe-gallery";
import IsLoggedIn from "../shared/IsLoggedIn";

import confirmationDialog from "../../assets/utils/confirmationDialog";
import { formateDate } from "../../assets/utils/dateHelper";

const Comment = ({ comment }) => {
  const { author, body, id: commentId, comment_image_data } = comment;
  // eslint-disable-next-line no-unused-vars
  const { postedDate, _, __ } = formateDate(comment);
  const { id } = useParams();
  const dispatch = useDispatch();

  const handleDelete = () => {
    confirmationDialog(
      () =>
        dispatch(removeCommentThunk({ post_id: id, comment_id: commentId })),
      "Are you sure you want to delete?"
    );
  };

  // TODO: implement spinner while image is loading

  return (
    <div className="py-3">
      <span className="fw-bold text-primary">{author}</span>
      <p className="mt-2 text-break">{body}</p>
      {comment_image_data && (
        <Row className="my-2">
          <Col md={6} lg={3}>
            <Gallery>
              <Item
                height={comment_image_data.metadata.height}
                original={comment_image_data.comment_image_url}
                thumbnail={comment_image_data.comment_image_url}
                width={comment_image_data.metadata.width}
              >
                {({ ref, open }) => (
                  <img
                    alt={comment_image_data.filename}
                    className="img-fluid rounded-1"
                    onClick={open}
                    ref={ref}
                    src={comment_image_data.comment_image_url}
                  />
                )}
              </Item>
            </Gallery>
          </Col>
        </Row>
      )}
      <div className="d-flex justify-content-between align-items-end">
        <small className="text-secondary">{postedDate}</small>
        <IsLoggedIn>
          <Button
            size="sm"
            type="button"
            variant="danger"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </IsLoggedIn>
      </div>
    </div>
  );
};

export default Comment;
