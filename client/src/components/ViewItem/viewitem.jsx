import "./viewitem.css";
import { useParams } from "react-router-dom/dist";
import AXIOS from "axios";
import { Row, Col, Container, Button } from "react-bootstrap";
import { FaCartShopping } from "react-icons/fa6";
import UserHeader from "../../user/userHeader/userheader";
import axios from "axios"
import { useState,useEffect } from "react"
import Footer from "../Footer/footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function ViewItem() {
  const [plant, setPlant] = useState([]);
  const [email, setEmail] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const [cart, setCart] = useState([]);
 
  useEffect(() => {
   fetchCartData(email);
  }, [])
  
 
  const fetchCartData = async (email) => {
   try {
     let body = {
       "email" : email
   }
     const response = await axios.post('http://localhost:9000/api/cart', body);
     setCart(response.data.carts);
   } catch (error) {
     console.error('Error fetching cart data:', error);
   }
 };

  useEffect(() => {
    const url = `http://localhost:9000/api/plants/${id}`;
    AXIOS.get(url).then((response) => {
      setPlant(response.data.plant);
    });
  }, [id]);

  const handleAddToCart = () => {
    const existingCartItem = cart.find((item) => item.pcode === plant.pcode);
  
    if (existingCartItem) {
      const updatedCart = cart.map((item) =>
        item.pcode === plant.pcode
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      setCart(updatedCart);
      toast.error("Product already exists in the cart, please increase the quantity !",{
        theme: "colored"
      })
    } else {
      const url = `http://localhost:9000/api/addtocart`;
      let body = {
        pcode: plant.pcode,
        name: plant.name,
        price: plant.price,
        images: plant.images[0],
        email: email,
        quantity: quantity,
      };
  
      AXIOS.post(url, body).then((res) => {
        var stat = res.data.status;
        if (stat) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message, {
            position: "top-center"
          });
        }
      });
    }
  };
  

  const imageUrl =
    plant.images && plant.images.length > 0
      ? `http://localhost:9000/${plant.images[0]}`
      : "";

  return (
    <div>
      <Container>
      <UserHeader cartNo={cart.filter((item, index, self) =>
  index === self.findIndex((t) => (
    t.pcode === item.pcode 
  ))
).length} userEmail={(email)=>{
          setEmail(email);
          fetchCartData(email);
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
        <ToastContainer 
        />
        <hr></hr>
      </Container>
      <Footer/>
    </div>
  );
}
