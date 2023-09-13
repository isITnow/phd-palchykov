import { useSelector, useDispatch } from "react-redux";
import { selectToken, selectIsLoggedIn } from "../../redux/auth/selectorAuth";
import { logoutThunk } from "../../redux/auth/operationsAuth";

import LoginForm from "../FormComponents/LoginForm";
import ModalAuth from "../shared/ModalAuth";
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
    <div className="p-4 bg-secondary bg-gradient mt-auto">
      <div className="d-flex container">
        <div className="flex-grow-1 text-center text-light">
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

        <div className="text-center text-light">
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
              data-bs-target="#authModal"
              size="22"
            />
          )}
        </div>
        <ModalAuth>
          <LoginForm />
        </ModalAuth>
      </div>
    </div>
  );
};

export default Footer;
