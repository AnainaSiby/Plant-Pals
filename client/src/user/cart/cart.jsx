import { Container, Row, Col, Button } from "react-bootstrap";
import Footer from "../../components/Footer/footer";
import UserHeader from "../userHeader/userheader";
import "./cart.css";
import AXIOS from "axios";
import { useState, useEffect } from "react";
import DeleteCart from "./cartdelete";
import { useSelector } from "react-redux";

export default function Cart() {
  const [{ userInfo }] = useSelector((state) => [state.commonReducer])
  const [cart, setCart] = useState([]);
console.log("userdetails", userInfo);
  useEffect(() => {
    const url = "http://localhost:9000/api/cart";
    let body = {"email":"logintest1@gmail.com"}
    AXIOS.get(url,body).then((response) => {
      setCart(response.data.carts);
    });
  }, [cart]);

  const handleQuantityChange = (index, event) => {
    const newCart = [...cart];
    const selectedQuantity = parseInt(event.target.value);
    newCart[index].quantity = selectedQuantity;
    newCart[index].totalPrice = newCart[index].price * selectedQuantity;
    setCart(newCart);
  };

  // Calculate total cart value
  const totalCartValue = cart.reduce((total, cartItem) => {
    return total + (cartItem.totalPrice ? cartItem.totalPrice : cartItem.price);
  }, 0);

  return (
    <div>
      <UserHeader />
      <Container className="cart-container">
        <Row >
          <Col>
            <div className="cart-head">
              <h3>My Cart</h3>
            </div>
            <div className="cart-row">
            <div className="total-cart-value">
              Total : ₹ <span>{totalCartValue.toFixed(2)} </span>
            </div>
            <hr/>
            <ul>
              {cart.map((cartItem, index) => (
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
                          ? cartItem.totalPrice
                          : cartItem.price}
                      </Row>
                    </Col>
                    <Col className="cart-remove">
                      <DeleteCart itemId={cartItem._id}/>
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
