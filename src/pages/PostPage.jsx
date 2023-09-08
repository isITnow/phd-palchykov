import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { removePostThunk } from "../redux/posts/operationsPosts";

import Post from "../components/Posts/Post";
import Section from "../components/shared/Section";

const PostPage = () => {
  const { id } = useParams();

  return <Section>{`Post ID: ${id}`}</Section>;
};

export default PostPage;
