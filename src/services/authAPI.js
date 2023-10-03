import { privateAPI, publicAPI } from "./http";

const loginUser = async (loginData) => {
  return await publicAPI.post("/login", loginData);
};

const logoutUser = async () => {
  await privateAPI.delete(`/logout`);
};

// const getCurrentUser = async () => {
//   const { data } = await privateAPI.get("/users/tokens/info");
//   return data;
// };

export const authAPI = {
  loginUser,
  logoutUser,
  // getCurrentUser,
};
