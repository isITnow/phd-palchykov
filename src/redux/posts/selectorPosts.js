export const selectPostsList = (state) => state.posts.postsList;
export const selectOnePost = (state) => state.posts.onePost;
export const selectError = (state) => state.posts.error;
export const selectStatus = (state) => state.posts.status;
export const selectComments = (state) => state.posts.onePost?.comments;
