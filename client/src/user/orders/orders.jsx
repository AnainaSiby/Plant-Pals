import "./orders.css";
import UserHeader from "../userHeader/userheader";
import Footer from "../../components/Footer/footer";
import axios from "axios";
import { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import '@stripe/react-stripe-js';

export default function Orders() {
  const { address, phone, totalprice, products, email } = useParams();
  const productsArray = JSON.parse(decodeURIComponent(products));
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');

  const handleModifyCart = () => {
    navigate("/cart");
  };

  useEffect(() => {
    const fetchClientSecret = async () => {
      const response = await axios.post('http://localhost:9000/api/payment', {
        amount: totalprice, 
      });
      setClientSecret(response.data.clientSecret);
    };

    fetchClientSecret();
  }, [totalprice]);

  const deleteCart = (email) => {
    const url = `http://localhost:9000/api/deletecart/${email}`;
    axios.delete(url).then((response) => {
    });
  };

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        products: productsArray,
        totalPrice: totalprice,
        email: email,
        address: address,
        phone: phone,
      };
      await axios.post(
        "http://localhost:9000/api/order",
        orderData
      );
      deleteCart(email);
      toast.success("Hurray!!! Order placed", {
        position: "top-center",
      });
      const url = `/myorders/${email}`;
      navigate(url);
    } catch (error) {
      toast.error("Error placing order");
    }
  };

  const handlePayment = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Anaina Siby'
        }
      }
    });
    if (result.error) {
      toast.error(result.error.message)
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        toast.success("Payment successful")
        handlePlaceOrder();
      }
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
                <Col lg={8}>
                  ₹{" "}
                  <span
                    style={{
                      color: "green",
                      fontSize: "larger",
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    {totalprice}{" "}
                  </span>
                </Col>
              </Row>
            </div>
            <hr></hr>
            <div>
              <Row style={{ marginTop: "20px",}}>
                <Col lg={4}>Order Items</Col>

                <Col lg={8}>
                  {productsArray.map((product) => (
                    <Col
                      className="product-items"
                      style={{ marginTop: "20px" }}
                    >
                      <Col>
                        <img
                          src={`http://localhost:9000/${product.images}`}
                          alt="plant_image"
                          style={{ width: "150px", height: "120px", borderRadius:"10px" }}
                        ></img>
                      </Col>
                      <Col>
                        <p
                          style={{
                            color: "green",
                            fontSize: "large",
                            marginTop: "10px",
                          }}
                        >
                          {" "}
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
                <div>
                <hr></hr>
                  <Row style={{marginTop:"30px"}}>
                    <Col lg={4}>
                      Enter Card details
                    </Col>
                    <Col lg={8}>
                    <CardElement />
                    </Col>
                  </Row>
                </div>
              </Row>
            </div>
          </div>
          <div className="confirm-order">
            <Button
              variant="danger"
              style={{ marginRight: "10px" }}
              onClick={handleModifyCart}
            >
              MODIFY CART
            </Button>
            <Button variant="success" onClick={handlePayment}>
              CONFIRM ORDER
            </Button>
          </div>
        </div>
      </div>
      <div>
</div>

      <ToastContainer />
      <Footer />
    </>
  );
}
