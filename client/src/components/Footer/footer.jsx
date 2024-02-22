import './footer.css'
import { Container,Row,Col } from "react-bootstrap"
import { PiPlantDuotone } from "react-icons/pi";

export default function Footer(){
    return(
        <div>
            <Container fluid>
                <Row>
                    <Col className="f-head">
                       <p> <PiPlantDuotone /> To plant a garden is to believe in tomorrow <PiPlantDuotone /></p>
                    </Col>
                </Row>
            </Container>
            <Container fluid className='f-end' style={{padding:"0", margin:"0"}}>
            <Row>
                <img 
                src="/footer-bg.jpg"
                    alt="footer-img"
                />
            </Row>
            <hr></hr>
            <Row className='f-copy'>
                <Col>
                © 2024, Plant Pals. All rights reserved.
                </Col>
            </Row>
            
            </Container>
         
        </div>
    )
}