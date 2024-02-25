import { Container, Row, Col, Button,Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import "./shop.css";
import AXIOS from "axios";
import Footer from "../components/Footer/footer";

export default function ShopPage() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const url = `http://localhost:9000/api/plants?search=${search}`;
    AXIOS.get(url).then((response) => {
      setPlants(response.data.plants);
    });
  }, [search]);

  return (
    <div>
      <Container className="shop-now">
      <Form className="d-flex" style={{paddingBottom:"40px"}}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value = {search}
              onChange = {(e)=>setSearch(e.target.value)}
            />
          </Form>
        <Row>
          <Col className="plant-cards">
            <Row>
              {plants.map((plant, index) => (
                <Col lg={3}>
                  <div className="plant-card">
                    <div key={plant._id}>
                      <a href={`/item/${plant._id}`}>
                        <div>
                          <img
                            src={`http://localhost:9000/${plant.images[0]}`}
                            alt="plant_image"
                            style={{ width: "250px", height: "300px", borderRadius:"10px" }}
                          ></img>
                        </div>
                      </a>
                      <a href={`/item/${plant._id}`}>
                        <div className="plant-name">{plant.name}</div>{" "}
                      </a>
                      <div className="plant-price">₹ {plant.price}</div>
                      <div className="view-pro-button">
                        <a href={`/item/${plant._id}`}>
                          <Button variant="success">View Product</Button>
                        </a>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
      <Footer/> 
    </div>
  );
}
