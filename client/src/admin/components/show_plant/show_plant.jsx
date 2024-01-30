import "./show_plant.css";
import { useParams } from "react-router-dom/dist";
import AXIOS from "axios";
import { useState, useEffect } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import DeletePlant from "../delete_plants/delete_plants";

export default function ShowPlant() {
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
              <div className="option-btns">
              <a href={`/admin_edit/${plant._id}`}>
                <Button variant="success">EDIT</Button> </a>
               <DeletePlant/> 
              </div>
              <Row className="about-the-plant">
          <Col>{plant.description}</Col>
        </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
