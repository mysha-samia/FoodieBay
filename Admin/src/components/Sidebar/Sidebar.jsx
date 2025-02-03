import React from 'react';
import "./Sidebar.css";
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router-dom';

const sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="sidebar-options">
            <NavLink to='/add'className="sidebar-option">
                <img src={assets.add_icon}/>
                <p className='sidebar-content'>Add Items</p>
            </NavLink >
            <NavLink to='/list' className="sidebar-option">
                <img src={assets.order_icon}/>
                <p className='sidebar-content'>List Items</p>
            </NavLink>
            <NavLink to='/order' className="sidebar-option">
                <img src={assets.order_icon}/>
                <p className='sidebar-content'>Order</p>
            </NavLink>
        </div>
    </div>
  )
}

export default sidebar



