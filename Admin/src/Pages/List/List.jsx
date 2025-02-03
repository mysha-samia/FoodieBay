import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import "./List.css";

//display the available food items on the database
const List = ({url}) => {
  const [List,setList] = useState([]);

  const fetchList =async()=>{
    const response =await axios.get(`${url}/api/food/list`);
    // console.log(response.data);
    if(response.data.success){
      setList(response.data.data)
    }else{
      toast.error('Erorr Occurs')
    }
  }
  //for every load fetch list function will be loaded
  useEffect(()=>{
    fetchList();
  },[]);

const removeFood =async(itemId)=>{
console.log(itemId);
const response =await axios.post(`${url}/api/food/remove`,{id:itemId});
await fetchList();
if(response.data.success){
   toast.success(response.data.message);
}else{
  toast.error(response.data.message);
}
}







  return (
    <div className="list add flex-col">
       <p class="heading">All Foods List</p> 
       <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {List.map((item,index)=>{
          return(
         <div key={index} className="list-table-format flex-col">
            <img  className="styled-image" src={`${url}/image/`+item.image} alt="" />
            <p>{item.name}</p>
            <p>{item.description}</p>
            <p>{item.category}</p>
            <p>TK{item.price}</p>
            <p onClick={()=>{removeFood(item._id)}}className="cursor">X</p>
         </div>
          )
        })}
       </div>

    </div>
  )
}

export default List 