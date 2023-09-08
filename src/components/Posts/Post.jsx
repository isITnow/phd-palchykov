import moment from "moment";
import { Link } from "react-router-dom";

import s from "./post.module.css";

const Post = ({ post }) => {
  const postedDate = moment(post.created_at).fromNow();
  const editedDate = moment(post.updated_at).fromNow();
  const isEdited = post.updated_at > post.created_at;

  return (
    <Link to={`/posts/${post.id}`}>
      <div className={`${s.hoverEffect} card`}>
        <div className="card-header">
          <small className="text-primary">posted: {postedDate}</small>
          {isEdited && (
            <>
              <span className="mx-2">|</span>
              <small className="text-primary">updated: {editedDate}</small>
            </>
          )}
        </div>
        <div className="card-body">
          <p className="card-text">{post.body}</p>
        </div>
      </div>
    </Link>
  );
};

export default Post;
