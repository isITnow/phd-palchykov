import jwt_decode from "jwt-decode";

const checkTokenStatus = (token) => {
  const decoded = jwt_decode(token);
  return Date.now() > decoded.exp * 1000;
};

export default checkTokenStatus;
