
import { Container,Row,Col } from "react-bootstrap"
import './about.css'

function About(){
    return(
        <Container fluid className="about" id="about">
           <Row>
            <Col lg={5}>
              <div>
                <img 
                src="/about.jpg"
                width={500}
                height={400}
                alt="home-decor"
                />
              </div>
            </Col>
            <Col lg={7}>
            <div className="about-details">
            <h3>About Us</h3>
            <p>
            Plant Pals is India's largest and most trusted online plant nursery that specializes in all your gardening needs. The Ugaoo online nursery not only sells premium quality exotic indoor plants, outdoor plants, flowering plants, and succulents to name a few, but also specializes in organic vegetable, herb, and flower seeds. We provide premium, trendy planters, best in class soil and fertilizers, and all the gardening tools a home gardener can need.<br></br>
            <br></br>

At Plant Pals we believe that we are more than a garden store, we help people grow along their gardening journey, Afterall plants grow people. We believe in the magic of growing things and discovering our inner self in the process while reveling in the jot of your first new leaf, your first bloom, or your first sprouted seed.<br></br>
<br></br>

Plant Pals prides itself in the fact that it is not just an online garden store or online plant nursery but a friend who helps both you and your garden grow. We provide a lifetime of gardening support and hand hold you through all your gardening journeys.

            </p>
            </div>
            </Col>
            </Row>
            </Container>
    )
}

export default About;