import About from "../components/About/about";
import Banner from "../components/Banner/banner";
import Features from "../components/Features/features";
import Footer from "../components/Footer/footer";
import ShopNow from "../components/ShopNow/shopnow";

export default function Home(){
    return(
        <div>
            <Banner/>
            <About/>
            <Features/>
            <ShopNow/>
            <Footer/>
        </div>
    )
}