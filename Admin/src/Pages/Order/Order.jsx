// import React, { useEffect } from 'react';
// import "./order.css";
// import { useState } from 'react';
// import {toast} from "react-toastify";
// import axios from "axios";
// import {assets} from "../../assets/assets";
// const Order = ({url}) => {

//   const [orders,setOrders] = useState([]);
//   const fetchAllOrders = async ()=>{
//       const response = await axios.get(url+"/api/order/list");
//       if(response.data.success){
//         setOrders(response.data.data);
//         console.log(response.data.data);
//       }else{
//         toast.error("Error")
//       }
//   };
//  const updateStatus = async (event,orderId)=>{
//  const response = await axios.post(url+"/api/order/status",{
//   orderId,
//   Status:event.target.value
//  })
//  if(response.data.success){
//   await fetchAllOrders();
//  }

//  }
//     useEffect(()=>{
//       fetchAllOrders();
//     },[]);
//     return (
//       <div className='order add'>
//         <h3>Order Page</h3>
//         <div className="order-list">
//           {orders.map((order,index)=>( 
//             <div className='order-item' key={index}>
//               <img src={assets.parcel_icon} alt=""/>
//               <div>
//                 <p className='order-item-food'>
//                   {order.items.map((item,index)=>{
//                     if(index===order.items.length-1){
//                       return item.name + " X " + item.quantity;
//                     }else{
//                       return item.name + " X " + item.quantity + " , ";
//                     }
//                   })}

//                 </p>
//                 <p className="order-item-name">
//                   {order.address.firstName + " " + order.address.lastName}
                  
//                 </p>
//                 <div className='order-item-address'>
//                   {/* <p>{order.address.street+" , "}</p> */}
//                   <p>{order.address.city + " , " + order.address.state + " , " +order.address.country +" , "+order.address.zipcode}</p>
//                 </div>
//                 <p className='order-item-phone'>{order.address.phone}</p>
//               </div>
//               <p>Items : {order.items.length}</p>
//               <p>Tk {order.amount}</p>
//              <select onChange={(event)=> updateStatus(event,order._id)} value={order.Status}>
//               <option value="Food Processing">
//                 Food Processing
//               </option>
//               <option value="Out for delivery">
//                Out For Delivery
//               </option>
//               <option value="Delivered">
//                Delivered
//               </option>
//              </select>
//             </div>
//           ))}
//         </div>
//       </div>
//     )
//   }
 


// export default Order



import React, { useEffect, useState } from "react";
import "./order.css";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../assets/assets";

const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);

  // Fetch all orders
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Error fetching orders");
    }
  };

  // Update order status
  const updateStatus = async (event, orderId) => {
    const newStatus = event.target.value;

    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        Status: newStatus, // Ensure correct key
      });

      if (response.data.success) {
        // Update state immediately instead of waiting for fetch
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, Status: newStatus } : order
          )
        );
        toast.success("Order status updated!");
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Error updating status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div className="order-item" key={index}>
            <img src={assets.parcel_icon} alt="Parcel Icon" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) =>
                  index === order.items.length - 1
                    ? item.name + " X " + item.quantity
                    : item.name + " X " + item.quantity + " , "
                )}
              </p>
              <p className="order-item-name">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>
                  {order.address.city +
                    " , " +
                    order.address.state +
                    " , " +
                    order.address.country +
                    " , " +
                    order.address.zipcode}
                </p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>Tk {order.amount}</p>
            <select
              onChange={(event) => updateStatus(event, order._id)}
              value={order.Status}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;




