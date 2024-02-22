import About from "../components/About/about"
import Banner from "../components/Banner/banner"
import Features from "../components/Features/features"
import Footer from "../components/Footer/footer"
import AdminHeader from "./components/admin_header/ad_header"


export default function AdminHome(){
    return(
        <div>
            <AdminHeader/>
            <Banner/>
            <About/>
            <Features/>
            <Footer/>           
        </div>
    )
}