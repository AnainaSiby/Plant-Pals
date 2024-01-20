import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import "./view_plant.css";
import AXIOS from "axios";


export default function ViewPlants() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    const url = "http://localhost:9000/api/plants";
    AXIOS.get(url).then((response) => {
      setPlants(response.data.plants);
    });
  }, []);

  return (
    <div>
      <Container>
        <Row>
          <Col lg={3}>admin bar</Col>
          <Col className="plant-cards">
            <Row>
              {plants.map((plant, index) => (
                <Col lg={4}>
                  <div key={plant._id}>
                  <div className="plant-card">
                    <a href={`/plant/${plant._id}`}>
                      <div>
                        <img
                          src={`http://localhost:9000/${plant.images[0]}`}
                          alt="plant_image"
                          style={{ width: "250px", height: "300px" }}
                        ></img>
                      </div>
                      <div className="plant-name">{plant.name}</div>
                      </a>
                      <div className="plant-price">₹ {plant.price}</div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
