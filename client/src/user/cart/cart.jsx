import { Container, Row, Col, Button } from "react-bootstrap";
import Footer from "../../components/Footer/footer";
import UserHeader from "../userHeader/userheader";
import "./cart.css";
import axios from "axios";
import { useState, useEffect } from "react";
import DeleteCart from "./cartdelete";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [email, setEmail] = useState("");
  const [userdata, setUserdata] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartData(email);
  }, []);

  const fetchCartData = async (email) => {
    try {
      let body = {
        email: email,
      };
      const response = await axios.post("http://localhost:9000/api/cart", body);
      setCart(response.data.carts);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const handleQuantityChange = (index, event) => {
    const selectedQuantity = parseInt(event.target.value);
    const updatedCart = cart
      .filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.pcode === item.pcode)
      )
      .map((item, idx) => {
        if (idx === index) {
          // Update quantity and total price for the selected item
          return {
            ...item,
            quantity: selectedQuantity,
            totalPrice: selectedQuantity * item.price,
          };
        }
        return item;
      });
    setCart(updatedCart);
  };

  // Calculate total cart value
  const totalCartValue = cart.reduce((total, cartItem) => {
    return total + (cartItem.totalPrice ? cartItem.totalPrice : cartItem.price * cartItem.quantity);
  }, 0);

  const handleOrder = () => {
    const { address, phone } = userdata; 
    const productsString = JSON.stringify(cart
      .filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.pcode === item.pcode)
      ));
    const url = `/place_order/${encodeURIComponent(address)}/${phone}/${totalCartValue}/${encodeURIComponent(productsString)}`; 
    navigate(url);
  };

  return (
    <div>
      <Container className="cart-container">
        <UserHeader
          cartNo={
            cart.filter(
              (item, index, self) =>
                index === self.findIndex((t) => t.pcode === item.pcode)
            ).length
          }
          userEmail={(email,userdata) => {
            setEmail(email);
            setUserdata(userdata);
            fetchCartData(email);
          }}
        />
        <Row>
          <Col>
            <div className="cart-head">
              <h3>My Cart</h3>
            </div>
            <div className="cart-row">
              <div className="order-total">
                <div className="order-btn">
                  <Button variant="success" onClick={handleOrder}>
                    CONTINUE TO ORDER
                  </Button>
                </div>
                <div className="total-cart-value">
                  Total : ₹ <span>{totalCartValue.toFixed(2)} </span>
                </div>
              </div>
              <hr />
              <ul>
                {cart
                  .filter(
                    (item, index, self) =>
                      index === self.findIndex((t) => t.pcode === item.pcode)
                  )
                  .map((cartItem, index) => (
                    <li key={index}>
                      <Row className="cart-list">
                        <Col>
                          <img
                            src={`http://localhost:9000/${cartItem.images}`}
                            alt="plant_image"
                            style={{ width: "250px", height: "200px" }}
                          ></img>
                        </Col>
                        <Col>
                          <Row className="cart-name">{cartItem.name}</Row>
                          <Row className="cart-qua">
                            Quantity
                            <select
                              id="qua"
                              value={cartItem.quantity}
                              onChange={(event) =>
                                handleQuantityChange(index, event)
                              }
                            >
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                            </select>
                          </Row>
                          <Row className="cart-price">
                            Price : ₹{" "}
                            {cartItem.totalPrice
                              ? cartItem.totalPrice.toFixed(2) // Display total price
                              : (cartItem.price * cartItem.quantity).toFixed(
                                  2
                                )}{" "}
                            {/* Calculate total price */}
                          </Row>
                        </Col>
                        <Col className="cart-remove">
                          <DeleteCart itemId={cartItem.pcode} />
                        </Col>
                      </Row>
                    </li>
                  ))}
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}
