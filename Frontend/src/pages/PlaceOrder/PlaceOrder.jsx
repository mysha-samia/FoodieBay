import React, { useContext} from "react";
import axios from 'axios';
import { useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const PlaceOrder = () => {
  const { getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext);
  //state variable for from info
  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:"",
  })
  const onChangeHandler=(event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }
  //this function will redirect us to payment gateway

  const placeOrder = async(event)=>{
    event.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo = item;
        itemInfo["quantity"] =cartItems[item._id];
        orderItems.push(itemInfo);
      }
      console.log(orderItems); 
    })
    let orderData ={
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+80,
    }
    //sending order data to the api
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}});
    if(response.data.success){
      //if the response is true we will get the session url
      const {session_url} = response.data;
      //sending the users with the session url;
      window.location.replace(session_url);
    }else{
      alert("Error Occured");
    }
  };

  const navigate = useNavigate();
  //without logging place order page wouldnt show up
  useEffect(()=>{
    if(!token){
      //if the token is not available we will be navigate to the cart page
    navigate("/cart");

    }else if(getTotalCartAmount ()===0){
      navigate("/cart");
    }
   
  },[token, getTotalCartAmount, navigate]);




  useEffect(()=>{
    
    console.log(data)
  },[data]);

  return (
    <form onSubmit={placeOrder}className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input required name="firstName" onChange ={onChangeHandler} value={data.firstName} type="text" placeholder="First name" />
          <input required  name="lastName" onChange ={onChangeHandler} value={data.lastName} type="text" placeholder="Last name" />
        </div>
        <input required  name="email" onChange ={onChangeHandler} value={data.email} type="email" placeholder="Your Email" />
        <input required  type="text" placeholder="Street" />
        <div  className="multi-fields">
          <input required  name="city" onChange ={onChangeHandler} value={data.city} type="text" placeholder="City" />
          <input required name="state" onChange ={onChangeHandler} value={data.state} type="text" placeholder="State" />
        </div>
        <div  className="multi-fields">
          <input required  name="zipcode" onChange ={onChangeHandler} value={data.zipcode} type="text" placeholder="Zip Code" />
          <input required  name="country" onChange ={onChangeHandler} value={data.country} type="text" placeholder="Country" />
        </div>
        <input required  name="phone" onChange ={onChangeHandler} value={data.phone} type="text" placeholder="Phone" />
      </div>
      <div className="place-order-right">
        <div className="item-total">
          <h2 className="cart-menu">Cart Total</h2>
          <div className="item-total-details">
            <p>SubTotal</p>
            <p>&#2547;{getTotalCartAmount()}</p>
          </div>
          <hr></hr>
          <div className="item-total-details">
            <p>Delivery Fee</p>
            <p> &#2547;{80}</p>
          </div>
          <hr></hr>
          <div className="item-total-details">
            <p>
              <b>Total</b>
            </p>
            {getTotalCartAmount() ? (<p>&#2547;{getTotalCartAmount() + 80}</p>) :
           (
            <p>&#2547;0</p>
            )}
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
