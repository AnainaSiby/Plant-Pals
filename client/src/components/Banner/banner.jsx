import Carousel from 'react-bootstrap/Carousel';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Banner() {

 const nav = useNavigate();

 const handleClick = ()=>{
     nav('/shop')
  }

  return (
    <Carousel indicators={false}>
      <Carousel.Item interval={1000}>
        <img
        src="/banner-1.jpg"
        width={5379}
        height={595}
        alt="First slide" 
        style={{width:"100%"}}/>
        <Carousel.Caption className='slide'>
          <Button variant="success" onClick={handleClick}>SHOP NOW</Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1000}>
      <img
        src="/banner-2.jpg"
        width={3692}
        height={595}
        alt="Second slide" 
        style={{width:"100%"}} />
        <Carousel.Caption className='slide'>
          <Button variant="success" onClick={handleClick}>SHOP NOW</Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1000}>
      <img
        src="/banner-3.jpg"
        width={3692}
        height={595}
        alt="Third slide" 
        style={{width:"100%"}} />
        <Carousel.Caption className='slide'>
          <Button variant="success" onClick={handleClick}>SHOP NOW</Button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Banner;