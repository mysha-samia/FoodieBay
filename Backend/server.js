import express from "express";
import cors from "cors";
import { connectDB } from "./Config/db.js";
import foodRouter from "./Routes/foodRoute.js";
import userRouter from "./Routes/userRoute.js";
import dotenv from 'dotenv';
import cartRouter from "./Routes/cartRoute.js";
import orderRouter from "./Routes/orderRoute.js";
dotenv.config();
//app-config
const app=express();
const port =4000;

//middlewares
app.use(express.json());
app.use(cors());

//database connection
connectDB();
//api endpoints
app.use("/api/food",foodRouter);
app.use("/image",express.static("Uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart",cartRouter) ;
app.use("/api/order",orderRouter);


app.get("/",(req,res)=>{
res.send("API WORKING");
});


//RUN THE EXPRESS SERVER
app.listen(port,()=>{
    console.log(`server started on ${port}`);
});
//to test the api we would use HopSoctch
//for database we would use mongodb atlas database
// mongodb+srv://MyshaSamiha:2020952@cluster0.biory.mongodb.net/?