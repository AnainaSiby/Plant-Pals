import './header.css'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SignIn from '../SignIn/signin';


function Header() {
  return (
    <div className='fixed-top'>
     <div className='header1'> 
         <p className='notis'>Free Shipping above ₹499 | All India Delivery </p>
         <p>  Call for enquiries : 7902360734</p>
      </div>
      <div className='navclass'>
    <Navbar expand="lg" className="bg-light">
      <Container fluid>
        <Navbar.Brand href="/" className="ta text-success">PLANT PALS</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className= "me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link  href="/" className='text-success'>Home</Nav.Link>
            <Nav.Link  href="/aboutus" className='text-success'>About US</Nav.Link>
            <Nav.Link  href="/shop" className='text-success'>Visit Store</Nav.Link>
          </Nav>
          <div className='profile-cart'>
            <SignIn/>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
    </div>
  );
}

export default Header;