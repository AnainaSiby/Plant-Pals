import { RiRecycleFill } from "react-icons/ri";
import { Container, Row, Col } from "react-bootstrap";
import './features.css'
import { GiCardExchange } from "react-icons/gi";
import { PiPottedPlantFill } from "react-icons/pi";

export default function Features() {
  return (
    <Container fluid style={{paddingBottom:'60px'}}>
      <Row className="fea-row">
      <Row className="fea-head">
        <h3>Why Plant Pals !</h3>
    </Row>
        <Col lg={4} className="fea">
        <RiRecycleFill />
          <p>Secure and Recyclable Packaging</p>
        </Col>
        <Col lg={4} className="fea">
        <GiCardExchange />
          <p>Free Replacements if Damaged</p>
        </Col>
        <Col lg={4} className="fea">
        <PiPottedPlantFill />
          <p>Self-Watering Pots with Every Plant</p>
        </Col>
      </Row>
      <Row className="playvideo">
        <Col lg={7} className="vcol shadow">
          <video controls width="640" height="360">
            <source src="/video-why.mp4" type="video/mp4" />
          </video>
        </Col>
      </Row>
      <Row>
        <Col lg={8} className="fea-end">
        <h3>Experience the magic of growing plants</h3>
        <p>Plant pal is here to inspire you to have plants around you. To look at life in a very different way, helping you connect with nature. Each plant you buy is packed and shipped with care, from our 18-acre farm to your doorstep.</p>
        </Col>
      </Row>
    </Container>
  );
}
