import UserHeader from "./userHeader/userheader"
import Banner from '../components/Banner/banner.jsx'
import Features from '../components/Features/features.jsx'
import Footer from '../components/Footer/footer.jsx'
import UserShopNow from "./usershopnow.jsx"
import axios from "axios"
import { useState,useEffect } from "react"
import UserAbout from "./userabout/userabout.jsx"

export default function UserHome(){
  const [cart, setCart] = useState([]);
 const [email, setEmail] = useState("");

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
  return(
      <div>
         <UserHeader cartNo={cart.filter((item, index, self) =>
  index === self.findIndex((t) => (
    t.pcode === item.pcode 
  ))
).length} userEmail={(email)=>{
          setEmail(email);
          fetchCartData(email);
      }}/>
          <Banner/>
          <UserAbout/>
          <Features/>
          <UserShopNow/>
          <Footer/>
      </div>
  )
}