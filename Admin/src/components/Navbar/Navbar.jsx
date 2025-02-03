import React from 'react'
import "./Navbar.css";
import { assets } from '../../assets/assets.js';
const Navbar = () => {
  return (
    <div className='navbar'>
       
        <img src={assets.adminPanel} className="navbar-logo"></img>
        <h2 className='admin-heading'>FoodieBay Admin Dashboard</h2>
        <img src={assets.adminPic} className='navbar-adminPic'></img>
    </div>
  )
}

export default Navbar