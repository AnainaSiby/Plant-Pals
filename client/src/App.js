import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Header from "./components/Header/Header.jsx";

const Home = lazy(()=> import('./pages/home.jsx'))
const Admin = lazy(()=>import('./admin/admin_home.jsx'))
const AdminViewPlants = lazy(()=> import('./admin/viewplants.jsx'))
const AdminShowPlant = lazy(()=>import('./admin/showplant.jsx'))
const ShopNow = lazy(()=>import('./pages/shop.jsx'))
const ViewProduct = lazy(()=>import('./pages/viewproduct.jsx'))

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
        <Route path="/viewallplants" element={<AdminViewPlants/>}/>
        <Route path="/plant/:id" element={<AdminShowPlant />} />
        <Route path="/shop" element={<ShopNow/>}/>
        <Route path="/item/:id" element={<ViewProduct/>}/>
      </Routes>
      </Suspense>
    </>
  );
}

export default App;
