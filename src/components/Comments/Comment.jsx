import { Button, Col, Row } from 'react-bootstrap';
import { Gallery, Item } from 'react-photoswipe-gallery';
import IsLoggedIn from '../shared/IsLoggedIn';

import { formateDate } from '@/utils/dateHelper';
import useComments from '@/components/Comments/hooks/useComments';

import 'photoswipe/dist/photoswipe.css';

const Comment = ({ comment }) => {
  const { handleDelete } = useComments();
  const { author, body, id: commentId, comment_image_data } = comment;
  // eslint-disable-next-line no-unused-vars
  const { postedDate, _, __ } = formateDate(comment);

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
            onClick={() => handleDelete(commentId)}
          >
            Delete
          </Button>
        </IsLoggedIn>
      </div>
    </div>
  );
};

export default Comment;
