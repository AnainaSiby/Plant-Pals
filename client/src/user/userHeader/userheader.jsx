import "./userheader.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { FaCartShopping } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function UserHeader() {
    const navigate = useNavigate();
    const handleViewcart = ()=>{
       navigate('/cart')
    }
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
                <Nav.Link href="/" className="text-success">
                  Home
                </Nav.Link>
                <Nav.Link href="/aboutus" className="text-success">
                  About US
                </Nav.Link>
                <Nav.Link href="/shop" className="text-success">
                  Visit Store
                </Nav.Link>
              </Nav>
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
                <Button title="Logout">
                  <RiLogoutCircleRFill />
                </Button>
                <Button title="My Cart" onClick={handleViewcart}>
                <FaCartShopping />
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
