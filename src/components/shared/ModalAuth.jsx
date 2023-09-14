import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectError } from "../../redux/auth/selectorAuth";

import Alert from "../../components/shared/Alert";
import { useAlert } from "../../assets/utils/useAlert";

const ModalAuth = ({ children }) => {
  const { alert, showAlert } = useAlert();
  const error = useSelector(selectError);

  useEffect(() => {
    if (error) {
      error?.includes("400")
        ? showAlert("Email or password is invalid", "danger")
        : showAlert(error, "danger");
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <div
      className="modal fade"
      id="authModal"
      tabIndex="-1"
      aria-labelledby="authModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-warning bg-gradient">
            <h1
              className="modal-title fw-bold fs-5 text-danger"
              id="authModalLabel"
            >
              Admin only
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body text-start">
            <Alert state={alert} />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAuth;
