export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectUserEmail = (state) => state.user.user?.email;
export const selectUserName = (state) => state.user.user?.username;
export const selectUserRole = (state) => state.user.user?.role;
export const selectToken = (state) => state.user.token;
export const selectError = (state) => state.user.error;
