import formateDate from "../../assets/utils/formateDate";
import useSignInStatus from "../../assets/utils/useSignInStatus";

const Comment = ({ comment }) => {
  // eslint-disable-next-line no-unused-vars
  const { postedDate, _, __ } = formateDate(comment);
  const isLoggedIn = useSignInStatus();

  return (
    <div className="py-3">
      <span className="fw-bold text-primary">{comment.author}</span>
      <p className="mt-2">{comment.body}</p>
      <div className="d-flex justify-content-between">
        <small className="text-secondary">{postedDate}</small>
        {isLoggedIn && <div className="btn btn-sm btn-danger">delete</div>}
      </div>
    </div>
  );
};

export default Comment;
