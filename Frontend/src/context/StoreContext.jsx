import {createContext,useState} from "react";
import { food_list } from "../assets/assets";



export const StoreContext = createContext(null);
const StoreContextProvider =(props)=>{
const[cartItems,setCartItems] =useState({});
const addCartItems=(itemId)=>{
    if(!cartItems[itemId]){
        setCartItems((prev)=>({
            ...prev,[itemId]:1
        }))
    }else{
        setCartItems((prev)=>({
            ...prev,[itemId]: prev[itemId]+1
        })) 
    } 
};
const removeCartItems=(itemId)=>{
    setCartItems((prev)=>({
        ...prev,[itemId]: prev[itemId]-1
    }))  
}



    const contextVlaue ={
     food_list  ,
     cartItems,
     setCartItems,
     addCartItems,
     removeCartItems, 
    }
    return(
        <StoreContext.Provider value ={contextVlaue}>
            {props.children}
        </StoreContext.Provider>
    )
  
}
export default StoreContextProvider;     