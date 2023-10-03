export const selectError = (state) => state.user.error;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectStatus = (state) => state.user.status;
export const selectToken = (state) => state.user.token;
export const selectUserEmail = (state) => state.user.user?.email;
export const selectUserName = (state) => state.user.user?.username;
export const selectUserRole = (state) => state.user.user?.role;
