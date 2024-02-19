import { defer } from 'react-router-dom'
import './orders.css'
import UserHeader from '../userHeader/userheader'
import Footer from '../../components/Footer/footer'
import { useState } from 'react'
import axios from 'axios'

export default function Orders(){
    const [cart, setCart] = useState([]);
 const [email, setEmail] = useState("");
 let totalCartValue = "100"
 
  const handlePlaceOrder = async () => {

    try {
      // Prepare order data
      const orderData = {
        products: cart.map((item) => ({
          pcode: item.pcode,
          name: item.name,
          price: item.price,
          images: item.images,
        })),
        totalPrice: totalCartValue,
        email: email,
        address: "User's address", // You need to replace this with the user's actual address
        phone: "User's phone number", // You need to replace this with the user's actual phone number
      };

      // Send order data to backend
      const response = await axios.post(
        "http://localhost:9000/api/orders",
        orderData
      );

      // Handle success, display a message or redirect to a confirmation page
      console.log("Order placed successfully:", response.data);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };
    return(
        <> 
         <UserHeader/>
         <div className='order-details'>
            Order Details
         </div>
         <Footer/>
        </>
    )
}