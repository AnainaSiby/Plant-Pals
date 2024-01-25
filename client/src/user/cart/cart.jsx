import { Container,Row,Col } from "react-bootstrap";
import Footer from "../../components/Footer/footer";
import UserHeader from "../userHeader/userheader";
import './cart.css'

export default function cart(){
    return(
        <div>
            <UserHeader/>
            <Container className="cart-container">
             <Row>
                <Col>
                  <div className="cart-head">
                    <h3>My Cart</h3>
                    <Row>
                    <Col>
                      image
                    </Col>
                    <Col>
                      Name
                    </Col>
                    <Col>
                      Price
                    </Col>
                    <Col>
                      Button
                    </Col>
                    </Row>
                  </div>
                </Col>
             </Row>
            </Container>
            <Footer/>
        </div>
    )
}