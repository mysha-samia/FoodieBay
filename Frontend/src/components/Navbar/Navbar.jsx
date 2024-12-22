import React, { useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import {Link} from "react-router-dom";

const navbar = ({setshowLogin}) => {


  const [menu,setMenu] = useState ("Home")
  return (
    <div className='navbar'>
    <img src={assets.FoodieBay} alt="logo" className="logo" />
    <ul className="navbar-menu">
      <Link to="/" onClick={()=>{setMenu("home")}} className={menu === "home" ? "active" : ""}> Home </Link>
      <a href="#explore-menu" onClick={()=>{setMenu("Menu")}}  className=  {menu === "Menu" ? "active" : ""}> Menu</a>
      <a href="#app-download" onClick={()=>{setMenu("Mobile-App")}}  className= {menu === "Mobile-App" ? "active" : ""}> Mobile-App</a>
      <a href="#footer"onClick={()=>{setMenu("Contact-Us")}} className= {menu === "Contact-Us" ? "active" : ""}> Contact Us</a>
</ul>
<div className="navbar-right">
  <img src={assets.search_icon}
  alt="navbar-search"></img>
  <div className="navbar-search-icon">
    <img src={assets.basket_icon} alt=""/>
    <div className="dot"></div>
  </div>
  <button onClick={()=>setshowLogin(true)}className="navbar-btn">Sign In</button>

</div>
    </div>
  )
}

export default navbar