import { Link } from "react-router-dom";

import { formateDate } from "../../assets/utils/dateHelper";

import s from "./post.module.css";

const Post = ({ post, single }) => {
  const { postedDate, editedDate, isEdited } = formateDate(post);

  const commentsCount = single ? post?.comments?.length : post?.comments;
  const cardStyle = single ? "card shadow" : `${s.hoverEffect} card`;

  return (
    <div className={cardStyle}>
      <div className="card-header">
        <small className="text-primary fw-bold">posted: {postedDate}</small>
        {isEdited && (
          <>
            <span className="mx-2">|</span>
            <small className="text-primary fw-bold">
              updated: {editedDate}
            </small>
          </>
        )}
        {!!commentsCount && (
          <>
            <span className="mx-2">|</span>
            <small className="text-primary fw-bold">
              comments: {commentsCount}
            </small>
          </>
        )}
      </div>
      {single ? (
        <div className="card-body">
          <p className="card-text">{post.body}</p>
        </div>
      ) : (
        <Link to={`/posts/${post.id}`} style={{ color: "inherit" }}>
          <div className="card-body">
            <p className="card-text text-truncate">{post.body}</p>
          </div>
        </Link>
      )}
    </div>
  );
};

export default Post;
