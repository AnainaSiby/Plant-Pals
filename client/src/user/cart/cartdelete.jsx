import {Button,  Col, Row } from "react-bootstrap";
import Modal from "@mui/material/Modal";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import AXIOS from "axios";
import "./cartdelete.css";

export default function DeleteCart(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = () => {
    const url = `http://localhost:9000/api/deletecart/${props.itemId}`;
    AXIOS.delete(url).then((response) => {
      alert(response.data.message);
      handleClose();
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
    </div>
  );
}
