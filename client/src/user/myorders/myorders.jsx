import { useState, useEffect } from 'react'
import Footer from '../../components/Footer/footer'
import UserHeader from '../userHeader/userheader'
import './myorders.css'
import {Row,Col,} from 'react-bootstrap'
import AXIOS from 'axios'

export default function MyOrders(){
 const [orders, setOrders] = useState([]);

 useEffect(() => {
    const url = "http://localhost:9000/api/myorders";
    AXIOS.get(url).then((res) => {
      setOrders(res.data.orders);
      console.log("orderss",res.data.orders)
    });
  }, []);

    return(
        <>
        <UserHeader/>
        <div className="my-orders">
        <div className="orders ">
          <h3>MY ORDERS</h3>
          <div className="order-list">
            <div>
              <Row>
                <Col lg={4}>Shipping Address</Col>
                <Col lg={8}></Col>
              </Row>
            </div>
            <hr></hr>
            <div>
              <Row style={{ marginTop: "20px" }}>
                <Col lg={4}>Contact Number</Col>
                <Col lg={8}></Col>
              </Row>
            </div>
            <hr></hr>
            <div>
              <Row style={{ marginTop: "20px" }}>
                <Col lg={4}>Total Price</Col>
                <Col lg={8}>₹ <span style={{color:'green', fontSize:"larger", fontWeight:"bold"}}> </span></Col>
              </Row>
            </div>
            <hr></hr>
            <div>
             
                <Row style={{ marginTop: "20px" }}>
                  <Col lg={4}>Order Items</Col>
                  
                  <Col lg={8} >
                    <Col className="product-items" style={{ marginTop: "20px" }}>
                    <Col>
                      
                    </Col>
                    <Col>
                   <p style={{color:'green', fontSize:'large', marginTop: "10px"}}>   </p>
                      <p style={{ marginTop: "10px" }}>
                        {" "}
                        Quantity: 
                      </p>
                      <p style={{ marginTop: "10px" }}>
                        {" "}
                        Price: 
                      </p>
                      
                    </Col>
                    </Col>
                  </Col>
                  
                </Row>
             
            </div>
          </div>
        </div>
      </div>
        <Footer/>
        </>
    )
}