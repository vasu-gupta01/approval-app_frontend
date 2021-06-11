import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

import { Link } from "react-router-dom";

function FormResult(props) {
  const [isOpen, setIsOpen] = React.useState(false);

  const success = props.success;

  useEffect(() => {
    setIsOpen(props.show);
  }, [props.show]);

  // const hideModal = () => {
  //   setIsOpen(false);
  // };

  return success ? (
    <Modal show={isOpen} dialogClassName="modal-dialog-centered">
      <div className="">
        <Modal.Header>
          <Modal.Title className="text-success bg-gradient">
            Success!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Your approval request has been submitted.</Modal.Body>
        <Modal.Footer as="footer">
          <Link className="btn btn-outline-dark" to="/">
            Go to homepage
          </Link>
        </Modal.Footer>
      </div>
    </Modal>
  ) : (
    <div className="container container-form alert alert-danger" role="alert">
      <h5 className="alert-heading">Submission failed</h5>
      <hr />
      <p className="mb-0">
        <Link className="btn btn-primary" to="/">
          Click here
        </Link>{" "}
        to fill another form
      </p>
    </div>
  );
}

// const SuccessMessage = () => {
//   return (
//     <div className="container container-form alert alert-success" role="alert">
//       <h5 className="alert-heading">
//         Your approval request was successfully submitted!
//       </h5>
//       <hr />
//       <p className="mb-0">
//         <Link className="btn btn-outline-dark" to="/">
//           Click here
//         </Link>{" "}
//         to fill another form
//       </p>
//     </div>
//   );
// };

// function FailureMessage() {}

export default FormResult;
