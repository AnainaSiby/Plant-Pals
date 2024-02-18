import "./userheader.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { FaCartShopping } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AXIOS from "axios";

function UserHeader(props) {
    const navigate = useNavigate();
    const sess = sessionStorage.getItem("token");
    const [userInfo, setuserInfo] = useState({});
    const {userEmail=()=>{}}=props
    const handleViewcart = ()=>{
       navigate('/cart')
    }

    const handleLogout = () =>{
      navigate('/')
    }
 
    useEffect(() => {
       user();
    },[]);

    const user = async () => {
      const url = `http://localhost:9000/api/userinfo`;
      try {
        const token = sess; 
        console.log("token",token);
        const response = await AXIOS.get(url, {
          headers: {
            "x-access-token": token
          }
        });
        setuserInfo(response.data)
       userEmail(response.data.email);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };
    

  return (
    <div className="fixed-top">
      <div className="header1">
        <p className="notis">Free Shipping above ₹499 | All India Delivery </p>
        <p> Call for enquiries : 7902360734</p>
      </div>
      <div className="navclass">
        <Navbar expand="lg" className="bg-light">
          <Container fluid>
            <Navbar.Brand href="/" className="ta text-success">
              PLANT PALS
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Nav.Link href="/userhome" className="text-success">
                  Home
                </Nav.Link>
                <Nav.Link href="/aboutus" className="text-success">
                  About US
                </Nav.Link>
                <Nav.Link href="/usershop" className="text-success">
                  Visit Store
                </Nav.Link>
              </Nav>
              <p className="userinfo">
                Hi, {userInfo ? userInfo.name : "Loading..."}
              </p>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
              <div className="profile-cart">
                <Button title="Logout" onClick={handleLogout}>
                  <RiLogoutCircleRFill />
                </Button>
                <Button title="My Cart" onClick={handleViewcart}>
                 <p>{props.cartNo}</p>
                </Button>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
}

export default UserHeader;
