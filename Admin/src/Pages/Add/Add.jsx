import React, { useState,useEffect } from 'react'
import "./Add.css";
import { assets } from '../../assets/assets';
import axios from "axios";
import { toast } from 'react-toastify';


const Add = ({url}) => {

  const [image,setImage]=useState(false);
  //for saving the updated data
  const[data,setData] =useState({
    name:"",
    description:"",
    price:"",
    category:"Salad",
  })
  const onChangeHandler =(event)=>{
    const name= event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))

    
  }
  const onSubmitHandler = async (event)=>{
     event.preventDefault();
     const formData =new FormData();
     formData.append("name",data.name);
     formData.append("description",data.description);
     formData.append("price",Number(data.price));
     formData.append("category",data.category);
     //sending image state as data
     formData.append("image",image);

   
  for (const [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`); 
  }


     //api call
     const response = await axios.post(`${url}/api/food/add`,formData)
     if(response.data.success){
       console.log("added");
       //resetting the value
       setData({
        name:"",
        description:"",
        price:"",
        category:""
      })
      //resetting image
      setImage(false);
      toast.success(response.data.message);
     }else{
      toast.error(response.data.message);
      console.log(" not added");
     }
  }

  useEffect(()=>{
    console.log("data updated",data);
  },[data])
  return (
    <div>
        <div className="add">
            <form action="" className='flex-col'>
                <div className="add-image-upload flex-col">
                <p className="marginForAll">Upload Image</p>
                <label  htmlFor="image">
                <img className="upload-image"src={image?URL.createObjectURL(image):assets.upload_area} alt=""/>
                </label>
                <input onChange={(e)=>setImage(e.target.files[0])}type="file" id="image" hidden required/>
                </div>
                <div className="add-product-name flex-col">
                <p className="marginForAll">Product Name</p>   
                {/* event for changes in input field */}
                <input  onChange={onChangeHandler} value={data.name}type="text" name="name" placeholder="Type Here"/>
                </div>
                <div className="add-product-description flex-col">
                <p className="marginForAll">Product Description</p>   
                <textarea  onChange={onChangeHandler} value={data.description} name="description" row='6' placeholder='Write Description Here' required></textarea>
                </div>
                <div className="add-category">
                    <div className="add-product-category flex-col">
                       <p className="marginForAll">Product Category</p>
                       <select name="category" className='select-category' onChange={onChangeHandler} value={data.category}>
                       <option value="Salad">Salad</option>
                       <option value="Rolls">Rolls</option>
                       <option value="Deserts">Deserts</option>
                       <option value="Sandwich">Sandwich</option>
                       <option value="Cake">Cake</option>
                       <option value="SetMenu">SetMenu</option>
                       <option value="Pasta">Pasta</option>
                       <option value="Noodles">Noodles</option>
                       </select>
                       </div>
                    <div className="add-price">
                      <p className="marginForAll">Product Price</p>
                      <input onChange={onChangeHandler} value={data.price} type="Number" name="price" placeholder="price"/>
                    </div>
                 
                </div>
                <button onClick={onSubmitHandler}className="add-btn"type="submit">ADD</button>
            </form>
        </div>
    </div>
  )
}

export default Add