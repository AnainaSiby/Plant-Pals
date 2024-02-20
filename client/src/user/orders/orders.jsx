import { defer } from "react-router-dom";
import "./orders.css";
import UserHeader from "../userHeader/userheader";
import Footer from "../../components/Footer/footer";
import { useState } from "react";
import axios from "axios";
import { Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function Orders() {
  const [cart, setCart] = useState([]);
  const { address, phone, totalprice, products, email } = useParams();
  const productsArray = JSON.parse(decodeURIComponent(products));
  console.log("params", address, phone, totalprice, productsArray);
  let totalCartValue = "100";
  const navigate = useNavigate();

  const handleModifyCart = () =>{
    navigate('/cart')
  }

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        products : productsArray,
        totalPrice: totalCartValue,
        email: email,
        address:address,
        phone:phone
      };
      console.log("Order Data:", orderData);
      const response = await axios.post(
        "http://localhost:9000/api/order",
        orderData
      );

      toast.success("Hurray!!! Order placed",{
        position:'top-center'
      });
    } catch (error) {
      toast.error("Error placing order");
    }
  };
  return (
    <>
      <UserHeader />
      <div className="order-details">
        <div className="order-box ">
          <h3>ORDER SUMMARY</h3>
          <div className="order-summary shadow">
            <div>
              <Row>
                <Col lg={4}>Shipping Address</Col>
                <Col lg={8}>{address}</Col>
              </Row>
            </div>
            <hr></hr>
            <div>
              <Row style={{ marginTop: "20px" }}>
                <Col lg={4}>Contact Number</Col>
                <Col lg={8}>{phone}</Col>
              </Row>
            </div>
            <hr></hr>
            <div>
              <Row style={{ marginTop: "20px" }}>
                <Col lg={4}>Total Price</Col>
                <Col lg={8}>₹ <span style={{color:'green', fontSize:"larger", fontWeight:"bold"}}> {totalprice} </span></Col>
              </Row>
            </div>
            <hr></hr>
            <div>
             
                <Row style={{ marginTop: "20px" }}>
                  <Col lg={4}>Order Items</Col>
                  
                  <Col lg={8} >
                  {productsArray.map((product) => (
                    <Col className="product-items" style={{ marginTop: "20px" }}>
                    <Col>
                      <img
                        src={`http://localhost:9000/${product.images}`}
                        alt="plant_image"
                        style={{ width: "150px", height: "120px" }}
                      ></img>
                    </Col>
                    <Col>
                   <p style={{color:'green', fontSize:'large', marginTop: "10px"}}>   {product.name}</p>
                      <p style={{ marginTop: "10px" }}>
                        {" "}
                        Quantity: {product.quantity}
                      </p>
                      <p style={{ marginTop: "10px" }}>
                        {" "}
                        Price: {product.price * product.quantity}{" "}
                      </p>
                      
                    </Col>
                    </Col>
                     ))}
                  </Col>
                  
                </Row>
             
            </div>
          </div>
          <div className="confirm-order">
          <Button variant="danger" style={{marginRight:"10px"}} onClick={handleModifyCart}>MODIFY CART</Button>
            <Button variant="success" onClick={handlePlaceOrder}>CONFIRM ORDER</Button>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
}
