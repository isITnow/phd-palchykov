import { privateAPI, publicAPI } from "./http";

const loginUser = async (loginData) => {
  return await publicAPI.post("/login", loginData);
};

const logoutUser = async () => {
  await privateAPI.delete(`/logout`);
};

export const authApi = {
  loginUser,
  logoutUser,
};
