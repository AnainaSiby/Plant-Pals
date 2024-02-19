import { defer } from 'react-router-dom'
import './orders.css'
import UserHeader from '../userHeader/userheader'
import Footer from '../../components/Footer/footer'
import { useState } from 'react'
import axios from 'axios'
import {Row,Col, Button} from 'react-bootstrap'
import { useParams } from 'react-router-dom'

export default function Orders(){
const [cart, setCart] = useState([]);
 const [email, setEmail] = useState("");
 const { address, phone, totalprice, products} = useParams();
 console.log("params", address, phone, totalprice, products);
 let totalCartValue = "100"

  const handlePlaceOrder = async () => {

    try {
      // Prepare order data
      const orderData = {
        products,
        totalPrice: totalCartValue,
        email: email,
        address: "User's address", // You need to replace this with the user's actual address
        phone: "User's phone number", // You need to replace this with the user's actual phone number
      };

      // Send order data to backend
      const response = await axios.post(
        "http://localhost:9000/api/orders",
        orderData
      );

      // Handle success, display a message or redirect to a confirmation page
      console.log("Order placed successfully:", response.data);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };
    return(
        <> 
         <UserHeader />
         <div className='order-details'>
        <div className='order-box '>
        <h3>ORDER SUMMARY</h3> 
         <div className='order-summary shadow'>
          <div>
            <Row>
            <Col lg={4}>
            Shipping Address
            </Col>
            <Col lg={8}>
            {address}
            </Col>
            </Row>
            </div>
          <hr></hr>
          <div>
          <Row>
            <Col lg={4}>
            Contact Number
            </Col>
            <Col lg={8}>
            {phone}
            </Col>
            </Row>
          </div>
          <hr></hr>
          <div>
          <Row>
            <Col lg={4}>
            Total Price
            </Col>
            <Col lg={8}>
            ₹ {totalprice}
            </Col>
            </Row>
          </div>
          <hr></hr>
          <div>
          <Row>
            <Col lg={4}>
            Order Items
            </Col>
            <Col lg={8}>
            details
            </Col>
            </Row>
          </div>
          </div>
          <div className='confirm-order'>
           <Button variant='success'>
            CONFIRM ORDER
           </Button>
          </div>
          </div>
         </div>
         <Footer/>
        </>
    )
}