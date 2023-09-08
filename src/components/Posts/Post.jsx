import { Link } from "react-router-dom";

import formateDate from "../../assets/utils/formateDate";

import s from "./post.module.css";

const Post = ({ post }) => {
  const { postedDate, editedDate, isEdited } = formateDate(post);

  return (
    <div className={`${s.hoverEffect} card`}>
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
      </div>
      <Link to={`/posts/${post.id}`} style={{ color: "inherit" }}>
        <div className="card-body">
          <p className="card-text">{post.body}</p>
        </div>
      </Link>
    </div>
  );
};

export default Post;
