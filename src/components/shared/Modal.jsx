import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectError } from "../../redux/auth/selectorAuth";

import Alert from "../../components/shared/Alert";
import { useAlert } from "../../assets/utils/useAlert";

const Modal = ({ children }) => {
  const { alert, showAlert } = useAlert();
  const error = useSelector(selectError);

  useEffect(() => {
    const isWrongCredentials = error?.includes("400");
    if (isWrongCredentials) {
      showAlert("Email or password is incorrect!", "danger");
      return;
    } else {
      showAlert(`${error}. Please contact your administrator!`, "danger");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5 text-danger" id="exampleModalLabel">
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
            {alert.visible && <Alert state={alert} />}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
