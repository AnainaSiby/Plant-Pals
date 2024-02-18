import UserHeader from "./userHeader/userheader"
import Banner from '../components/Banner/banner.jsx'
import About from '../components/About/about.jsx'
import Features from '../components/Features/features.jsx'
import Footer from '../components/Footer/footer.jsx'
import UserShopNow from "./usershopnow.jsx"

export default function UserHome(){
  return(
      <div>
         <UserHeader/>
          <Banner/>
          <About/>
          <Features/>
          <UserShopNow/>
          <Footer/>
      </div>
  )
}