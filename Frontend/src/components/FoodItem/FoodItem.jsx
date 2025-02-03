import React, { useContext, useState } from 'react';
import "./FoodItem.Css";
import { assets, food_list } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({id,name,image,price,description,category}) => {
    //to add on cart
    //it is not good to set the functionality for 32 items one state variable that is why we will use Usecontext
    // const [Itemcount,setItemCount]= useState (0);
    const {cartItems,setCartItems,addCartItems,removeCartItems,url}= useContext(StoreContext)
  return (
    <div className='food-item'>
        <div className="food-item-img-container">
            <img src={url+"/image/"+image} alt="" className="food-item-img" />
         {!cartItems[id]
          ? <img onClick={()=>{
            // setItemCount((prev)=>prev+1);
            addCartItems(id)
            }}
          src={assets.add_icon_white} className='add' alt="add-icon"/>
          : <div className="food-item-counter">
            <img onClick={()=>{
              // setItemCount((prev)=>prev-1);
              removeCartItems(id)
            }}src={assets.remove_icon_red}/>
            <p>{cartItems[id]}</p>
            <img onClick={()=>{
            // setItemCount((prev) => prev + 1);
            addCartItems(id)
            }}
            src={assets.add_icon_green}/>
            
          </div> }
        </div>
        <div className="food-item-info">
            <div className="food-item-name-ratings">
                <p className='food-item-name'>{name}</p>
                <img src={assets.rating_starts} />
           </div>
           <p className="food-item-description">{description}</p>
            <p className="food-item-price"> &#2547; {price.toLocaleString("en-BD")}</p>
        </div>
      
    </div>
  )
}

export default FoodItem
