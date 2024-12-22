import React from 'react';
import "./FoodDisplay.css";
import {StoreContext} from '../../context/StoreContext';
import { useContext } from 'react';
import FoodItem from '../FoodItem/FoodItem';
import { food_list } from '../../assets/assets';
const FoodDisplay = ({  category}) => {
const {food_list} = useContext(StoreContext);


console.log("Food list:", food_list);
console.log("Selected category:", category);
//foodlist array using the context api
  return (
    <div className="food-display" id="food-display">
      <h2>Top Dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((item,index)=>{
      if(category==="All" || category===item.category){
       
        return <FoodItem key={item._id || index} id={item._id}  name={item.name} image ={item.image} price={item.price} description={item.description} category={item.category} /> 
      }
        //  return <FoodItem key={index} id={item._id}  name={item.name} image ={item.image} price={item.price} description={item.description} category={item.category} />
        console.log(food_list.category);
      return null;
        })}
   
  
      </div>
    </div>
  )
}

export default FoodDisplay;


