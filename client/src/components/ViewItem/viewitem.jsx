import "./viewitem.css";
import { useParams } from "react-router-dom/dist";
import AXIOS from "axios";
import { useState, useEffect } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import { FaCartShopping } from "react-icons/fa6";

export default function ViewItem() {
  const [plant, setPlant] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const url = `http://localhost:9000/api/plants/${id}`;
    AXIOS.get(url).then((response) => {
      setPlant(response.data.plant);
    });
  }, [id]);

  const imageUrl =
    plant.images && plant.images.length > 0
      ? `http://localhost:9000/${plant.images[0]}`
      : "";

  return (
    <div>
      <Container>
        <Row className="plant-main">
          <Col lg={6} className="plant-image">
            <div>
              <img
                src={imageUrl}
                alt="plant_image"
                style={{ width: "550px", height: "500px" }}
              ></img>
            </div>
          </Col>
          <Col lg={6}>
            <Container className="plant-details">
              <div className="p-name"> {plant.name}</div>
              <div className="p-code">
                <span>Product code : </span>
                {plant.pcode}
              </div>
              <div className="p-price"> ₹ {plant.price}</div>
              <div>
              <Button variant="success"><FaCartShopping /><span style={{marginLeft:"10px"}}>ADD TO CART</span></Button>
              </div>
            </Container>
          </Col>
        </Row>
        <hr></hr>
        <Row className="about-the-plant">
            <h3>About the Product</h3>
          <Col>{plant.description}</Col>
        </Row>
        <hr></hr>
      </Container>
    </div>
  );
}
