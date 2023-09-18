import React, { useEffect, useState } from "react";
import { CiLogin, CiLogout } from "react-icons/ci";

import { useDispatch, useSelector } from "react-redux";
import { logoutThunk } from "../../redux/auth/operationsAuth";
import { selectError } from "../../redux/auth/selectorAuth";

import useSignInStatus from "../../assets/customHooks/useSignInStatus";
import { useAlert } from "../../assets/customHooks/useAlert";
import Alert from "../shared/Alert";
import AuthModal from "./AuthModal";
import LoginForm from "../FormComponents/LoginForm";

const Auth = () => {
  const [modalShow, setModalShow] = useState(false);
  const isLoggedIn = useSignInStatus();
  const dispatch = useDispatch(logoutThunk);

  const { alert, showAlert } = useAlert();
  const error = useSelector(selectError);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isLoggedIn]);

  const handleLogout = () => {
    dispatch(logoutThunk());
  };

  return (
    <>
      {isLoggedIn ? (
        <CiLogout
          className="text-light"
          style={{ cursor: "pointer" }}
          size="22"
          onClick={handleLogout}
        />
      ) : (
        <CiLogin
          className="text-light"
          style={{ cursor: "pointer" }}
          onClick={() => setModalShow(true)}
          size="22"
        />
      )}
      <AuthModal show={modalShow} onHide={() => setModalShow(false)}>
        <Alert state={alert} />
        <LoginForm />
      </AuthModal>
    </>
  );
};

export default Auth;
