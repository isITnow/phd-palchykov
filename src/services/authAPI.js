import { privateAPI, publicAPI } from "./http";

// const registerUser = async (profile) => {
//   const { data } = await publicAPI.post("/users/signup", profile);
//   return data;
// };

const loginUser = async (loginData) => {
  const { data } = await publicAPI.post("/users/tokens/sign_in", loginData);
  return data;
};

const logoutUser = async () => {
  await privateAPI.post(`/users/tokens/revoke`);
};

const getCurrentUser = async () => {
  const { data } = await privateAPI.get("/users/tokens/info");
  return data;
};

export const authAPI = {
  // registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
};
