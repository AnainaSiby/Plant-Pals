import Modal from "@mui/material/Modal";
import { FaUser } from "react-icons/fa";
import React, { useState } from "react";
import { Form, Container } from "react-bootstrap";
import { TextField, Button } from "@mui/material";
import AXIOS from "axios";
import "./signup.css";

export default function SignUp() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = "http://localhost:9000/api/addplant";
    AXIOS.post(url, { name, email, phone, password }).then((res) => {
      var stat = res.data.status;
      if (stat) {
        alert(res.data.message);
      } else {
        alert(res.data.message);
      }
    });
  };

  return (
    <div>
      <Button onClick={handleOpen}>
        <FaUser />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container className="signup-form">
          <Form className="p-4 form" onSubmit={handleSubmit}>
            <div className="app-name">
              <h1>PLANT PALS</h1>
            </div>
            <div className="formHead">
              <h3>Sign Up!</h3>
            </div>
            <Form.Group className="mb-3 formControl" controlId="formBasicEmail">
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                color="success"
                value={name}
                onChange={(e) => setName(e.target.value)}
                size="small"
              />
            </Form.Group>
            <Form.Group className="mb-3 formControl" controlId="formBasicEmail">
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                color="success"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="small"
              />
            </Form.Group>
            <Form.Group className="mb-3 formControl" controlId="formBasicEmail">
              <TextField
                fullWidth
                label="Phone"
                variant="outlined"
                color="success"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                size="small"
              />
            </Form.Group>
            <Form.Group className="mb-3 formControl" controlId="formBasicEmail">
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                color="success"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                size="small"
              />
            </Form.Group>
            <Button
              variant="contained"
              size="large"
              className="regbtn mt-1"
              type="submit"
            >
              SIGN UP
            </Button>
            <div className="ex-user">
              <p>
                Already a user? <a href="/">Sign in </a>
              </p>
            </div>
          </Form>
        </Container>
      </Modal>
    </div>
  );
}
