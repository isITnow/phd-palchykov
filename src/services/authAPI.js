import { privateAPI, publicAPI } from './http';

const loginUser = async ({ body }) => {
  return await publicAPI.post('/login', body);
};

const logoutUser = async () => {
  await privateAPI.delete(`/logout`);
};

export const authApi = {
  loginUser,
  logoutUser,
};
