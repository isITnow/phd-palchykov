import { AnimatePresence, motion } from 'framer-motion';
import { Button, ButtonGroup, Col } from 'react-bootstrap';

import BackBtn from '@/components/shared/BackBtn';
import CommentForm from '@/components/Comments/CommentForm';
import CommentsList from '@/components/Comments/CommentsList';
import CommentsListTitle from '@/components/Comments/CommentsListTitle';
import IsLoggedIn from '@/components/shared/IsLoggedIn';
import Loader from '@/components/shared/Loader';
import NotFoundPage from '@/pages/NotFoundPage';
import Post from '@/components/Posts/Post';
import PostForm from '@/components/Posts/PostForm';

import motionOptions from '@/utils/motionOptions';
import navTabs from '@/utils/navTabs';
import usePost from '@/pages/posts/hooks/usePost';

const PostPage = () => {
  const {
    comments,
    handleDelete,
    isLoading,
    isPending,
    post,
    setShowForm,
    showForm,
    isFetchingError,
  } = usePost();

  const anyComments = !!comments?.length;

  if (isLoading) {
    return <Loader />;
  }

  if (isFetchingError) {
    return <NotFoundPage />;
  }

  return (
    <Col lg={8} className="mx-auto">
      <Post post={post.data} single />
      {/* BUTTONS */}
      <div className="d-flex flex-row-reverse mt-3">
        <IsLoggedIn>
          <ButtonGroup className="ms-3">
            {showForm ? (
              <AnimatePresence>
                <motion.button
                  animate="animate"
                  className="btn btn-outline-secondary"
                  exit="exit"
                  initial="initial"
                  key="child"
                  type="button"
                  variants={motionOptions.fadeInOut}
                  onClick={() => setShowForm(false)}
                >
                  Cancel Update
                </motion.button>
              </AnimatePresence>
            ) : (
              <AnimatePresence>
                <motion.button
                  animate="animate"
                  className="btn btn-primary"
                  exit="exit"
                  initial="initial"
                  key="child"
                  type="button"
                  variants={motionOptions.fadeInOut}
                  onClick={() => setShowForm(true)}
                >
                  Edit
                </motion.button>
              </AnimatePresence>
            )}
            <Button
              disabled={isPending}
              type="button"
              variant="danger"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </ButtonGroup>
        </IsLoggedIn>
        <BackBtn path={navTabs.posts.path}>Go Back</BackBtn>
      </div>
      {/* POST FORM */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            animate="animate"
            className="mt-3"
            exit="exit"
            initial="initial"
            key="child"
            variants={motionOptions.fadeInOut}
          >
            <PostForm post={post.data} onCloseForm={() => setShowForm(false)} />
          </motion.div>
        )}
      </AnimatePresence>
      {/* COMMENTS */}
      <CommentForm />
      <div className="mt-3">
        <div className="mb-3">
          <CommentsListTitle text={anyComments ? 'Comments' : 'No Comments'} />
        </div>
        {anyComments && <CommentsList comments={comments} />}
      </div>
    </Col>
  );
};

export default PostPage;
