import userModel  from "../Models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

 //for user login
 export const userLogin = async(req,res)=>{
   const {email,password}=req.body;
   try{
    const user = await userModel.findOne({email});
     if(!user){
      return res.json({success:false,message:"User does not exist!"})
     }
     const isMatch = await bcrypt.compare(password,user.password);
     if(!isMatch){
      return res.json({success:false,message:'User email or passwords are not correct!'})
     }
     const token =createToken(user._id);
     res.json({success:true,token});

   }
   catch(error){
    console.log(error);
    res.json({success:false,message:"Error"});
   }
 }

  //token as response and send this to the user
  const createToken =(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET);
   }
      
 //for user registration
 export const registeredUser =async(req,res)=>{
    const {name,password,email} =req.body;
    //if user already exists in databse
    try{
     const exists = await userModel.findOne({email});
     if(exists){
        return res.json({success:false,message:"User already registered"})

     }
     //validating email format and strong password
     if(!validator.isEmail(email)){
        return res.json({success:false,message:"Please enter a valid email"})
     }
     if(password.length<8){
        return res.json({success:false,message:"Please enter a strong password"})
     }

     //encryption of password
     //hashing user password
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password,salt) ;

     //creting new user after regitration
     const newUser = new userModel({
        name:name,
        email:email,
        password:hashedPassword
     });
   const user =  await newUser.save();
   const token = createToken(user._id);
   res.json({success:true,token})
    }catch(error){
    console.log(error);
    res.json({success:false,message:"Error"})
    }
 }





