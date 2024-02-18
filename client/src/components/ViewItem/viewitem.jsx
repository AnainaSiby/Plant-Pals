import "./viewitem.css";
import { useParams } from "react-router-dom/dist";
import AXIOS from "axios";
import { useState, useEffect } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import { FaCartShopping } from "react-icons/fa6";
import UserHeader from "../../user/userHeader/userheader";

export default function ViewItem() {
  const [plant, setPlant] = useState([]);
  const [email, setEmail] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const url = `http://localhost:9000/api/plants/${id}`;
    AXIOS.get(url).then((response) => {
      setPlant(response.data.plant);
    });
  }, [id]);

  const handleAddToCart = () =>{
    const url = `http://localhost:9000/api/addtocart`;
    let body = {
      "pcode":plant.pcode,
      "name":plant.name,
      "price":plant.price,
      "images":plant.images[0],
      "email" : email
    }
    AXIOS.post(url, body).then(
      (res) => {
        var stat = res.data.status;
        if (stat) {
          alert(res.data.message);
        } else {
          alert(res.data.message);
        }
      }
    );
  }

  const imageUrl =
    plant.images && plant.images.length > 0
      ? `http://localhost:9000/${plant.images[0]}`
      : "";

  return (
    <div>
      <Container>
      <UserHeader userEmail={(email)=>{
          setEmail(email);
      }}/>
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
              <Button variant="success" onClick={handleAddToCart}><FaCartShopping /><span style={{marginLeft:"10px"}}>ADD TO CART</span></Button>
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
