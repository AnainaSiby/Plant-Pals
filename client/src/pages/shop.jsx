import { Container, Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import "./shop.css";
import AXIOS from "axios";
import Footer from "../components/Footer/footer";

export default function ShopPage() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    const url = "http://localhost:9000/api/plants";
    AXIOS.get(url).then((response) => {
      setPlants(response.data.plants);
    });
  }, []);

  return (
    <div>
      <Container className="shop-now">
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
                            style={{ width: "250px", height: "300px" }}
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
