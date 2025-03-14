import { Form, Formik } from 'formik';

import CustomTextArea from '@/components/FormComponents/CustomTextArea';
import SubmitBtn from '@/components/shared/SubmitBtn';

import { validation } from '@/utils/validationSchema';
import usePost from '@/components/Posts/hooks/usePost';

const PostForm = ({ post, onCloseForm }) => {
  const isNewItem = !post;
  const postId = post?.id;
  const submitBtnText = isNewItem ? 'Add Post' : 'Update Post';

  const { handleSubmit, isPending } = usePost({ postId, onCloseForm });

  return (
    <Formik
      enableReinitialize
      initialValues={{
        body: isNewItem ? '' : post.body,
      }}
      validationSchema={validation.postSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          <CustomTextArea
            label="Post Text"
            name="body"
            required
            rows="3"
            type="text"
          />
          <div className="d-flex flex-row-reverse">
            <SubmitBtn text={submitBtnText} disabled={isPending} />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default PostForm;
