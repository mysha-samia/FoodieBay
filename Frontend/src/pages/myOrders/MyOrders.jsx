import React, { useEffect, useState } from 'react';
import "./MyOrder.css";
import axios from 'axios';
import { useContext } from 'react';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const MyOrders = () => {
  const {url,token}= useContext(StoreContext);
  const [data,setData] = useState([]);
  const fetchOrders = async()=>{
    const response = await axios.post(url+"/api/order/userOrders",{},{headers:{token}});
    

    setData(response.data.data);
    console.log(response.data.data);
    console.log("API URL:", url);
  };
  useEffect(()=>{
    if(token){
     fetchOrders();
    }
  },[token]);
  
  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order,index)=>{
          return(
            <div key ={index}className="my-orders-order">
                  <img src={assets.parcel_icon} alt=""/>
                  <p>{order.items.map((item,index)=>{
                   if(index===order.items-1){
                    return item.name + " "+ " X " + " "+ item.quantity
                   }
                   else{
                    return item.name + " "+ " X " + " "+ item.quantity + ","
                   }

                  })}</p>
                  <p>Tk{order.amount}.00</p>
                  <p>Items : {order.items.length}</p>
                  <p><span>&#x25cf;</span><b>{order.Status}</b></p>
                  <button className='myorders-button' onClick={fetchOrders}>Track Order</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyOrders