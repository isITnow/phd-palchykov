import React, { useEffect, useState } from "react";
import { CiLogin, CiLogout } from "react-icons/ci";

import { useDispatch, useSelector } from "react-redux";
import { logoutThunk } from "../../redux/auth/operationsAuth";
import { selectError, selectStatus } from "../../redux/auth/selectorAuth";

import { useAlert } from "../../assets/customHooks/useAlert";
import useSignInStatus from "../../assets/customHooks/useSignInStatus";
import LoginForm from "../FormComponents/LoginForm";
import Alert from "../shared/Alert";
import AuthModal from "./AuthModal";

const Auth = () => {
  const [modalShow, setModalShow] = useState(false);
  const isLoggedIn = useSignInStatus();
  const dispatch = useDispatch(logoutThunk);

  const { alert, showAlert } = useAlert();
  const error = useSelector(selectError);
  const status = useSelector(selectStatus);

  useEffect(() => {
    if (error) {
      showAlert(error, "danger");
      return;
    }

    if (isLoggedIn) {
      showAlert("Welcome back!", "success");
      setTimeout(() => {
        setModalShow(false);
      }, 1000);

      return;
    }
  }, [error, isLoggedIn, showAlert]);

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
        <Alert state={alert} />
        <LoginForm status={status} />
      </AuthModal>
    </>
  );
};

export default Auth;
