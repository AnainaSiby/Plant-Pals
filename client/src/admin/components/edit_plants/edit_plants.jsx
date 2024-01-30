import React, { useEffect, useState } from "react";
import "./edit_plants.css";
import { Form, Container, Row, Col } from "react-bootstrap";
import { TextField, Button } from "@mui/material";
import { styles } from "../add_plants/style.js";
import AXIOS from "axios";
import { useNavigate, useParams } from "react-router-dom/dist/index.js";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import AdminHeader from "../admin_header/ad_header.jsx";

export default function EditBook() {
  const [pcode, setPcode] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const formdata = new FormData();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const url = `http://localhost:9000/api/plants/${id}`;
    AXIOS.get(url).then((response) => {
      setPcode(response.data.plant.pcode);
      setName(response.data.plant.name);
      setPrice(response.data.plant.price);
      setDescription(response.data.plant.description);
      setImages(response.data.plant.images);
    });
  }, [id]);

  const handleEdit = (e) => {
    e.preventDefault();
    const url = `http://localhost:9000/api/editplant/${id}`;
    for (let i = 0; i < images.length; i++) {
      formdata.append("images", images[i]);
    }
    AXIOS.put(url, formdata, {
      headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
      var stat = response.data.status;
      if (stat) {
        alert(response.data.message);
        navigate("/viewallplants");
      } else {
        alert(response.data.message);
      }
    });
  };
  return (
    <div>
      <AdminHeader />
      <Container className="edit-plant">
        <Row className="justify-content-center p-2 mt-4">
          <Col lg={6} className="col p-2 shadow rounded">
            <Form
              className="p-4 form"
              onSubmit={handleEdit}
              encType="multipart/form-data"
            >
              <div className="formHead">
                <h2>EDIT PLANT DETAILS</h2>
              </div>
              <Form.Group
                className="mb-3 formControl"
                controlId="formBasicEmail"
              >
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
              <Form.Group
                className="mb-3 formControl"
                controlId="formBasicEmail"
              >
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
                <FormControl className="mb-3">
                  <InputLabel
                    htmlFor="outlined-adornment-amount"
                    color="success"
                  >
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
              <Form.Group
                className="mb-4 formControl"
                controlId="formBasicEmail"
              >
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
                className="mb-3 file-input image-input"
              >
                {images.length > 0 && (
                  <Form.Control
                    type="file"
                    multiple
                    onChange={(e) => setImages(e.target.files)}
                  />
                )}
              </Form.Group>
              <Button
                variant="outlined"
                size="large"
                color="success"
                className="regbtn mt-1"
                type="submit"
              >
                UPDATE
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
