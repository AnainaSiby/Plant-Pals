import { Container, Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import "./shopnow.css";
import AXIOS from "axios";
import { useNavigate } from "react-router-dom";

export default function ShopNow() {
  const [plants, setPlants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const url = "http://localhost:9000/api/plants";
    AXIOS.get(url).then((response) => {
      setPlants(response.data.plants);
    });
  }, []);

  const handleViewAll = ()=>{
    navigate('/shop')
  }

  return (
    <div>
      <Container className="shop-now">
        <h3>SHOP NOW</h3>
        <Row>
          <Col className="plant-cards">
            <Row>
              {plants.slice(0,4).map((plant, index) => (
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
            <div className="view-all">
            <Button variant="outline-success" onClick={handleViewAll}>View All</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
