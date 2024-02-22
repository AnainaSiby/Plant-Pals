import { Button, Col, Row } from "react-bootstrap";
import Modal from "@mui/material/Modal";
import React from "react";
import AXIOS from "axios";
import "./cartdelete.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DeleteCart(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    const url = `http://localhost:9000/api/deletecartitem/${props.itemId}/${props.email}`;
    AXIOS.delete(url).then((response) => {
      toast.error(response.data.message);
      handleClose();
      window.location.reload();
    });
  };

  const handleCancel = () => {
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="danger">
        REMOVE
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="delete-modal">
          <div>
            <h2>Are you sure you want to remove this item from Cart?</h2>
            <div className="options">
              <Row className="options-row">
                <Col className="btn1">
                  <Button variant="success" onClick={handleDelete}>
                    CONFIRM
                  </Button>
                </Col>
                <Col className="btn2">
                  <Button variant="outline-danger" onClick={handleCancel}>
                    CANCEL
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </Modal>
      <ToastContainer />
    </div>
  );
}
