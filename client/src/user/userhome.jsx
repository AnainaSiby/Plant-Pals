import UserHeader from "./userHeader/userheader"
import Banner from '../components/Banner/banner.jsx'
import About from '../components/About/about.jsx'
import Features from '../components/Features/features.jsx'
import ShopNow from '../components/ShopNow/shopnow.jsx'
import Footer from '../components/Footer/footer.jsx'

export default function UserHome(){
  return(
      <div>
       
        <UserHeader/>
          <Banner/>
          <About/>
          <Features/>
          <ShopNow/>
          <Footer/>
      </div>
  )
}