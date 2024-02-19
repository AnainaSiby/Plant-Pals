import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Header from "./components/Header/Header.jsx";

const Home = lazy(()=> import('./pages/home.jsx'))
const Admin = lazy(()=>import('./admin/admin_home.jsx'))
const AdminAddplants = lazy(()=>import('./admin/addplants.jsx'))
const AdminViewPlants = lazy(()=> import('./admin/viewplants.jsx'))
const AdminShowPlant = lazy(()=>import('./admin/showplant.jsx'))
const ShopNow = lazy(()=>import('./pages/shop.jsx'))
const ViewProduct = lazy(()=>import('./pages/viewproduct.jsx'))
const UserHome = lazy(()=>import('./user/userhome.jsx'))
const AboutPage = lazy(()=>import('./pages/aboutPage/aboutpage.jsx'))
const Cart = lazy(()=>import('./user/cart/cart.jsx'))
const AdminEdit = lazy(()=>import('./admin/components/edit_plants/edit_plants.jsx'))
const AdminDelete = lazy(()=>import('./admin/components/delete_plants/delete_plants.jsx'))
const UserStore = lazy(()=>import('./user/userstore.jsx'))
const CartDelete = lazy(()=>import('./user/cart/cartdelete.jsx'))
const UserAbout = lazy(()=>import('./user/userabout/useraboutpage.jsx'))

function App() {
  return (
    <>
    <div>
      <Header/>
    </div>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/addplants" element={<AdminAddplants/>}/>
        <Route path="/viewallplants" element={<AdminViewPlants/>}/>
        <Route path="/plant/:id" element={<AdminShowPlant />} />
        <Route path="/shop" element={<ShopNow/>}/>
        <Route path="/usershop" element={<UserStore/>}/>
        <Route path="/item/:id" element={<ViewProduct/>}/>
        <Route path="/userhome" element={<UserHome/>}/>
        <Route path="/userabout" element={<UserAbout/>}/>
        <Route path="/aboutus" element={<AboutPage/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/admin_edit/:id" element={<AdminEdit/>}/>
        <Route path="/admin_delete/:id" element={<AdminDelete/>}/>
        <Route path="/deletecart/:id" element={<CartDelete/>}/>
      </Routes>
      </Suspense>
    </>
  );
}

export default App;
