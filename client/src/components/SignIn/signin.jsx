import Modal from "@mui/material/Modal";
import { FaUser } from "react-icons/fa";
import React, { useState } from "react";
import { Form, Container } from "react-bootstrap";
import { TextField, Button } from "@mui/material";
import AXIOS from "axios";
import "./signin.css";
import "./signup.css"
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress]= useState("");
  const [signin, setSignin] = useState(true)
  const [signup, setSignup] = useState(false)
  const nav = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    const url = "http://localhost:9000/api/signin";
    AXIOS.post(url, { email, password }).then((res) => {
      const { status, token } = res.data;
      if (status) {
        sessionStorage.setItem("token", token);
        nav('/userhome')
        setEmail("")
        setPassword("")
        handleClose();
      } else {
        alert(res.data.msg);
      }
    }).catch((error) => {
      console.error("Error during sign-in:", error);
    });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const url = "http://localhost:9000/api/signup";
    AXIOS.post(url, { name, email, phone, address, password }).then((res) => {
      var stat = res.data.status;
      if (stat) {
        alert(res.data.msg);
        setName("");
        setEmail("");
        setPhone("");
        setAddress("");
        setPassword("")
        showSignIn();
      } else {
        alert(res.data.msg);
      }
    });
  };

  const showSignUp = () =>{
   setSignin(false)
   setSignup(true)
  }

  const showSignIn = () =>{
  setSignin(true)
   setSignup(false)
   } 

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
        <Container className="signin-form">
         { signin && <Form className="p-4 form sin" onSubmit={handleSignIn}>
         <div className="app-name">
              <h1>PLANT PALS</h1>
            </div>
            <div className="formHead">
              <h3>Sign In!</h3>
            </div>
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
              SIGN IN
            </Button>
            <div className="nw-user">
              <p>
                New Here? <Button onClick={showSignUp}>Create an Account</Button>
              </p>
            </div>
          </Form>}
         { signup &&<Form className="p-4 form sup" onSubmit={handleSignUp}>
            <div className="app-name-sup">
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
                label="Address"
                variant="outlined"
                color="success"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
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
                type="password"
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
                Already a user? <Button onClick={showSignIn}>Sign in</Button>
              </p>
            </div>
          </Form>}
        </Container>
      </Modal>
    </div>
  );
}
