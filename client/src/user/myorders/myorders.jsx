import { useState, useEffect } from 'react'
import Footer from '../../components/Footer/footer'
import UserHeader from '../userHeader/userheader'
import './myorders.css'
import {Row,Col,} from 'react-bootstrap'
import AXIOS from 'axios'
import { useParams } from 'react-router-dom'

export default function MyOrders(){
 const [orders, setOrders] = useState([]);
 const { email } = useParams();

 useEffect(() => {
    const url = `http://localhost:9000/api/myorders?email=${email}`;
    AXIOS.get(url).then((res) => {
      setOrders(res.data.orders);
      console.log("orderss",res.data.orders)
    });
  }, []);

    return(
        <>
        <UserHeader/>
        <div className="my-orders">
        <div className="orders">
          <h3>MY ORDERS</h3>
         <div>
         {orders.map((order,index) => (
            <Row className='one-order shadow'>
              <Row style={{ padding: "10px" }}>
                <Col lg={5}>
                    Shipping Address
                </Col>
                <Col lg={7}>
                    {order.address}
                </Col>
              </Row>
              <hr></hr>
              <Row style={{ padding: "10px" }}>
                <Col lg={5}>
                    Contact Number
                </Col>
                <Col lg={7}>
                    {order.phone}
                </Col>
              </Row>
              <hr></hr>
              <Row style={{ padding: "10px" }}>
                <Col lg={5}>
                    Total Price
                </Col>
                <Col lg={7}>
                    {order.totalPrice}
                </Col>
              </Row>
              <hr></hr>
              <Row style={{ padding: "10px" }}>
                <Col lg={5}>
                   Order Items
                </Col>
                <Col>
               {(order.products).map((product)=>(
                <Col lg={7} style={{display:"flex"}}>
                <Col>
                <img
                        src={`http://localhost:9000/${product.images}`}
                        alt="plant_image"
                        style={{ width: "150px", height: "120px" }}
                      ></img>
                </Col>
                <Col>
                   <p style={{color:'green', fontSize:'large', marginTop: "10px"}}> 
                     {product.name}
                     </p>
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
            </Row>
               ))}
         </div>
        </div>
      </div>
        <Footer/>
        </>
    )
}