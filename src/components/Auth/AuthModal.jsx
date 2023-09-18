import Modal from "react-bootstrap/Modal";

const AuthModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="bg-warning bg-gradient" closeButton>
        <Modal.Title
          className="modal-title fw-bold fs-5 text-danger"
          id="contained-modal-title-vcenter"
        >
          Admin only
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
    </Modal>
  );
};

export default AuthModal;
