import { useQuery } from '@tanstack/react-query';

import { Col } from 'react-bootstrap';
import Loader from '../../components/shared/Loader';
import PostForm from '../../components/Posts/PostForm';
import PostsList from '../../components/Posts/PostsList';

import { postsApi } from '../../services/postsApi';
import useIsLoggedIn from '../../hooks/useIsLoggedIn';

const PostsPage = () => {
  const isLoggedIn = useIsLoggedIn();

  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: (meta) => postsApi.fetchPosts(meta),
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Col lg="8" className="mx-auto">
      {isLoggedIn ? (
        <div className="mb-4">
          <PostForm />
        </div>
      ) : (
        <div className="mb-4">
          <h3 className="text-center text-primary fw-bold">
            Welcome to my personal Blog
          </h3>
          <h4 className="text-center text-secondary fw-bold">
            Feel free to leave your comments
          </h4>
        </div>
      )}
      <PostsList posts={posts.data} />
    </Col>
  );
};

export default PostsPage;
