import React, { useState } from "react";
import "./add_plants.css";
import { Form, Container, Row, Col } from "react-bootstrap";
import { TextField, Button } from "@mui/material";
import { styles } from "./style.js";
import AXIOS from "axios";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";


export default function AddPlant() {
  const [pcode, setPcode] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const formdata = new FormData();

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = "http://localhost:9000/api/addplant";
    formdata.append("pcode", pcode);
    formdata.append("name", name);
    formdata.append("price", price);
    formdata.append("description", description);
    for (let i = 0; i < images.length; i++) {
      formdata.append("images", images[i]);
    }
    AXIOS.post(url, formdata, { "content-type": "multipart/form-data" }).then(
      (res) => {
        var stat = res.data.status;
        if (stat) {
          alert(res.data.message);
          setPcode("");
          setName("");
          setPrice(0);
          setDescription("");
          setImages([]);
        } else {
          alert(res.data.message);
        }
      }
    );
  };
  return (
    <Container className="add-plant">
      <Row className="justify-content-center p-2 mt-4">
        <Col lg={6} className="col p-2 shadow rounded">
          <Form
            className="p-4 form"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <div className="formHead">
              <h2>ADD A PLANT</h2>
            </div>
            <Form.Group className="mb-3 formControl" controlId="formBasicEmail">
              <TextField
                fullWidth
                id="fullWidth"
                label="Plant Code"
                variant="outlined"
                color="success"
                sx={styles.input}
                value={pcode}
                onChange={(e) => setPcode(e.target.value)}
                size="small"
              />
            </Form.Group>
            <Form.Group className="mb-3 formControl" controlId="formBasicEmail">
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                color="success"
                sx={styles.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
                size="small"
              />
            </Form.Group>
            <Form.Group>
              <FormControl fullWidth sx={{ m: 1 }} className="mb-3">
                <InputLabel htmlFor="outlined-adornment-amount" color="success">
                  Price
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">₹</InputAdornment>
                  }
                  label="Amount"
                  sx={styles.input}
                  color="success"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  size="small"
                />
              </FormControl>
            </Form.Group>
            <Form.Group className="mb-4 formControl" controlId="formBasicEmail">
              <TextField
                id="outlined-basic"
                label="Description"
                variant="outlined"
                color="success"
                sx={styles.input}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                size="small"
              />
            </Form.Group>
            <Form.Group
              controlId="formFileMultiple"
              className="mb-3 file-input"
            >
              <Form.Control
                type="file"
                multiple
                onChange={(e) => setImages(e.target.files)}
              />
            </Form.Group>
            <Button
              variant="outlined"
              size="large"
              color="success"
              className="regbtn mt-1"
              type="submit"
            >
              ADD
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
