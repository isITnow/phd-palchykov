import { useSelector, useDispatch } from "react-redux";
import { selectToken, selectIsLoggedIn } from "../../redux/auth/selectorAuth";
import { logoutThunk } from "../../redux/auth/operationsAuth";

import LoginForm from "../FormComponents/LoginForm";
import Modal from "../shared/Modal";
import { CiLogin, CiLogout } from "react-icons/ci";

const Footer = () => {
  const dispatch = useDispatch(logoutThunk);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const tokenStatus = useSelector(selectToken);

  const isAdminIn = isLoggedIn && tokenStatus;

  const handleClick = () => {
    dispatch(logoutThunk());
  };

  return (
    <div
      className="d-flex p-4"
      style={{ backgroundColor: "lightgray", marginTop: "auto" }}
    >
      <div className="flex-grow-1 text-center">
        <span className="me-2">© 2023. Developed by</span>
        <a
          className="text-reset fw-bold"
          href="https://www.linkedin.com/in/roman-serediuk/"
          target="_blank"
          rel="noreferrer noopener"
        >
          Roman Serediuk
        </a>
      </div>

      <div className="text-center">
        {isAdminIn ? (
          <CiLogout
            style={{ cursor: "pointer" }}
            size="22"
            onClick={handleClick}
          />
        ) : (
          <CiLogin
            style={{ cursor: "pointer" }}
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            size="22"
          />
        )}
      </div>
      <Modal>
        <LoginForm />
      </Modal>
    </div>
  );
};

export default Footer;
