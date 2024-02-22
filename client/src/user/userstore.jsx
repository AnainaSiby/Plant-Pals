import ShopPage from "../pages/shop";
import UserHeader from "./userHeader/userheader";
import axios from "axios"
import { useState,useEffect } from "react"

export default function Shop(){
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
        <>
        <UserHeader cartNo={cart.filter((item, index, self) =>
  index === self.findIndex((t) => (
    t.pcode === item.pcode 
  ))
).length} userEmail={(email)=>{
          setEmail(email);
          fetchCartData(email);
      }}/>
        <ShopPage/>
        </>
    )
}