import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const navbar = ({ setshowLogin }) => {
  const navigate = useNavigate();

  const [menu, setMenu] = useState("Home");
  const {getTotalCartAmount,token,setToken} = useContext(StoreContext);
  const logOut= ()=>{
    //clearing the authorization
   localStorage.removeItem("token");
   setToken("");
   //after logut user will be tranformed into the home page
   //using usenavigate hook
   navigate("/")
  }
  const myOrder = ()=>{
    navigate("/myOrders");
  }
  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.FoodieBay} alt="logo" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => {
            setMenu("home");
          }}
          className={menu === "home" ? "active" : ""}
        >
          {" "}
          Home{" "}
        </Link>
        <a
          href="#explore-menu"
          onClick={() => {
            setMenu("Menu");
          }}
          className={menu === "Menu" ? "active" : ""}
        >
          {" "}
          Menu
        </a>
        <a
          href="#app-download"
          onClick={() => {
            setMenu("Mobile-App");
          }}
          className={menu === "Mobile-App" ? "active" : ""}
        >
          {" "}
          Mobile-App
        </a>
        <a
          href="#footer"
          onClick={() => {
            setMenu("Contact-Us");
          }}
          className={menu === "Contact-Us" ? "active" : ""}
        >
          {" "}
          Contact Us
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="navbar-search"></img>
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
         {!token?     <button onClick={() => setshowLogin(true)} className="navbar-btn">
          Sign In
        </button> :
        <div className="navbar-profile">
          <img src={assets.profile_icon} alt=""/>
          <ul className="navbar-profile-dropdown">
            <div >
            <li onClick={myOrder}className="profile-icon-manage"><img  src={assets.bag_icon}/><p>Orders</p></li>
            </div>
            <hr/>
            <li onClick={logOut} className="profile-icon-manage"><img src={assets.logout} alt="p"/><p>LogOut</p></li>
          </ul>
        </div>
        }
      
      </div>
    </div>
  );
};

export default navbar;
