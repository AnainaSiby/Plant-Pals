import "./userheader.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AXIOS from "axios";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Tooltip from "@mui/material/Tooltip";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

function UserHeader(props) {
  const navigate = useNavigate();
  const sess = sessionStorage.getItem("token");
  const [userInfo, setuserInfo] = useState({});
  const { userEmail = () => {} } = props;
  const handleViewcart = () => {
    navigate("/cart");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    user();
  }, []);

  const user = async () => {
    const url = `http://localhost:9000/api/userinfo`;
    try {
      const token = sess;
      const response = await AXIOS.get(url, {
        headers: {
          "x-access-token": token,
        },
      });
      setuserInfo(response.data);
      userEmail(response.data.email, response.data);
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
            <Navbar.Brand href="/userhome" className="ta text-success">
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
                <Nav.Link href="/userabout" className="text-success">
                  About US
                </Nav.Link>
                <Nav.Link href="/usershop" className="text-success">
                  Visit Store
                </Nav.Link>
              </Nav>
              <p className="userinfo">
                Hi, {userInfo ? userInfo.name : "Guest"}
              </p>
              <div className="profile-cart">
                <div className="logout-btn">
                  <Tooltip title="Logout" placement="top">
                    <Button onClick={handleLogout} tooltip>
                      <FaSignOutAlt />
                    </Button>
                  </Tooltip>
                </div>
                <IconButton aria-label="cart" onClick={handleViewcart}>
                  <StyledBadge badgeContent={props.cartNo} color="secondary">
                    <ShoppingCartIcon />
                  </StyledBadge>
                </IconButton>
              </div>
              <Nav.Link
                href={`/myorders/${userInfo.email}`}
                className="text-success"
              >
                Orders
              </Nav.Link>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
}

export default UserHeader;
