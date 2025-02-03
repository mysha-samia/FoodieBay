import userModel from "../Models/userModel.js";

//add items to user cart
const addToCart = async (req,res) =>{
    try{
        let userData =await userModel.findById(req.body.userId)
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]){
           cartData[req.body.itemId] =1;

        }else{
            cartData[req.body.itemId]+=1;

        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
      // Save the updated data
      userData.cartData = cartData;
      await userData.save();

        res.json({success:true,message:"Items added to cart"})
    }
    catch(error){
    console.log(error);
   res.json({success:false,message:"Error occuered"})
    }
}

//remove items from the cart
const removeFromCart= async(req,res)=>{
  try{
  let userData = await userModel.findById(req.body.userId)
  let cartData = await userData.cartData;
  if(cartData[req.body.itemId]>0){
    cartData[req.body.itemId]= cartData[req.body.itemId]-1;
  }
  await userModel.findByIdAndUpdate(req.body.userId,{cartData})

 // Save the updated data
 userData.cartData = cartData;
 await userData.save();
  
  res.json({success:true,message:"Removed from cart"})
  }
  catch(error){
    console.log(error);
    res.json({success:false,message:"Error occuered"})
  }
}

//fetch user cart data
const getCart = async(req,res)=>{
     try{
      let userData =await userModel.findById(req.body.userId);
      let cartData = await userData.cartData;
       // Save the updated data
       userData.cartData = cartData;
       await userData.save();
      res.json({success:true,cartData})
     } catch(error){
        console.log(error);
        res.json({success:false,message:"Error occuered"})
     }
}
export {addToCart,removeFromCart,getCart};





