import {createContext,useState,useEffect} from "react";
import { food_list } from "../assets/assets";
import axios from "axios";



export const StoreContext = createContext(null);
const StoreContextProvider =(props)=>{
const[cartItems,setCartItems] =useState({});
const url ="http://localhost:4000";
const [token,setToken]= useState("");
const [food_list,setFoodList]= useState([]);
const addCartItems= async (itemId)=>{
    if(!cartItems[itemId]){
        setCartItems((prev)=>({
            ...prev,[itemId]:1
        }))
    }else{
        setCartItems((prev)=>({
            ...prev,[itemId]: prev[itemId]+1
        })) 
    } 
    // if (!token) {
    //     console.error("Token is missing.");
    //     return;
    // }
    
    // if(token){
    //     await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
    // }

    if (token) {
        try {
            const response = await axios.post(
                `${url}/api/cart/add`,
                { itemId },
                { headers: { token } }
            );
            console.log("Server response:", response.data);
        } catch (error) {
            console.error("Error saving cart data:", error.message);
        }
    } else {
        console.warn("Token is missing.");
    }




};
const removeCartItems= async(itemId)=>{
    setCartItems((prev)=>({
        ...prev,[itemId]: prev[itemId]-1
    }));
    if(token){
        await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
    }
}
const getTotalCartAmount= ()=>{
 let totalAmount= 0;
 //for in loop using as cartItems is a object
 for(const item in cartItems)
    {
        if(cartItems[item]>0){
            let intemInfo=food_list.find((product)=>product._id === item);
            totalAmount += intemInfo.price* cartItems[item]
        }

  
 }
 return totalAmount;
 console.log(totalAmount);
}
const fetchFoodList = async()=>{
      const response = await axios.get(url+"/api/food/list") ;
      setFoodList(response.data.data)
};
const loadCartData = async (token)=>{
    const response =await axios.post(url+"/api/cart/get",{},{headers:{token}});
    setCartItems(response.data.cartData);
 
}

useEffect(()=>{
   async function loadData(){
    await fetchFoodList();
    if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
    }
   }
    
 loadData();
},[])






    const contextVlaue ={
     food_list  ,
     cartItems,
     setCartItems,
     addCartItems,
     removeCartItems, 
     getTotalCartAmount,
     url,
     token,
     setToken,
     fetchFoodList 
    }
    return(
        <StoreContext.Provider value ={contextVlaue}>
            {props.children}
        </StoreContext.Provider>
    )
  
}
export default StoreContextProvider;     