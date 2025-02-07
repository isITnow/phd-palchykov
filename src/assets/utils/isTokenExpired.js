import jwt_decode from "jwt-decode";

const isTokenExpired = (token) => {
  const decoded = jwt_decode(token);
  return Date.now() > decoded.exp * 1000;
};

export default isTokenExpired;
