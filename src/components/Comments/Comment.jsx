import formateDate from "../../assets/utils/formateDate";
import useSignInStatus from "../../assets/customHooks/useSignInStatus";

import { useDispatch } from "react-redux";
import { removeCommentThunk } from "../../redux/comments/operationsComments";
import { useParams } from "react-router-dom";

const Comment = ({ comment }) => {
  // eslint-disable-next-line no-unused-vars
  const { postedDate, _, __ } = formateDate(comment);
  const { id } = useParams();
  const dispatch = useDispatch();
  const isLoggedIn = useSignInStatus();

  const handleClick = () => {
    window.alert("Are you sure?");
    dispatch(removeCommentThunk({ post_id: id, comment_id: comment.id }));
  };

  return (
    <div className="py-3">
      <span className="fw-bold text-primary">{comment.author}</span>
      <p className="mt-2">{comment.body}</p>
      <div className="d-flex justify-content-between">
        <small className="text-secondary">{postedDate}</small>
        {isLoggedIn && (
          <div className="btn btn-sm btn-danger" onClick={handleClick}>
            delete
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
