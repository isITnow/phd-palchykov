import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutThunk } from "../../redux/auth/operationsAuth";
import { selectStatus } from "../../redux/auth/selectorAuth";

import useSignInStatus from "../../assets/customHooks/useSignInStatus";

import { CiLogin, CiLogout } from "react-icons/ci";
import LoginForm from "../FormComponents/LoginForm";
import AuthModal from "./AuthModal";

const Auth = () => {
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch(logoutThunk);
  const isLoggedIn = useSignInStatus();

  const status = useSelector(selectStatus);

  useEffect(() => {
    if (isLoggedIn) {
      setModalShow(false);
      return;
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    dispatch(logoutThunk());
  };

  return (
    <>
      {isLoggedIn ? (
        <CiLogout
          className="text-light"
          size="22"
          style={{ cursor: "pointer" }}
          onClick={handleLogout}
        />
      ) : (
        <CiLogin
          className="text-light"
          size="22"
          style={{ cursor: "pointer" }}
          onClick={() => setModalShow(true)}
        />
      )}
      <AuthModal show={modalShow} onHide={() => setModalShow(false)}>
        <LoginForm status={status} />
      </AuthModal>
    </>
  );
};

export default Auth;
