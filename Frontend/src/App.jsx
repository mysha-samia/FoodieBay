import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home'; 
import Cart from './pages/Cart/Cart'; 
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import AppDownload from './components/AppDownload/AppDownload';
import LogInPop from './components/LogIn-PopUp/LogInPop';
 

const App = () => {
  const [showLogin,setshowLogin] = useState(false);
  return (

    <>
    {showLogin ? <LogInPop/>:<></>}
    <div className='app'>
     <Navbar setshowLogin={setshowLogin}/>
     <Routes> 
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<PlaceOrder />} />
      </Routes>
    </div>
    <AppDownload/>
  <Footer/>
  </>
  )
}

export default App 