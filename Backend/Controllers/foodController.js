import foodModel from "../Models/foodModel.js";
//in buit file system
import fs from 'fs';
//add food item
const addFood = async(req,res)=>{
let image_filename= `${req.file.filename}`;
const food = new foodModel({
   name:req.body.name,
   description:req.body.description,
   price:req.body.price,
   category:req.body.category,
   image:image_filename,
})
   

try{
   await food.save();
   res.json({success:true,message:'Food Successfully Added!'})
} catch(error){
   console.log(error);
   res.json({success:false,message:"Error Occurs!"})
}
};
//LISTING food items
const listFood =  async(req,res)=>{
   try {
      const foods = await foodModel.find({});
      if (!foods.length) {
          return res.status(404).json({ success: false, message: 'No food items found' });
      }
      res.status(200).json({ success: true, data: foods });
  }
 catch(error){
   console.log("error")
   res.json({success:false,message:"error"})
 }
}
//removeFoodItem
const removeFood = async(req,res)=>{
   try{
      const food = await foodModel.findById(req.body.id);
      //delete food image from the folder
      fs.unlink(`Uploads/${food.image}`,()=>{})
      //delete it from the database
      await foodModel.findByIdAndDelete(req.body.id);
      res.json({success:true,message:"Food removed"})
   }
   catch(error){
      res.json({success:false,message:`error:${error}`})
   }
}

export {addFood,listFood,removeFood}