// import orderModel from "../Models/orderModel.js";
// import userModel from "../Models/userModel.js";
// import Stripe from "stripe";
// import dotenv from "dotenv";

// dotenv.config();

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// //placing user order for frontend
// const placeOrder = async (req, res) => {
//   const frontendUrl = "http://localhost:5173";

//   try {
//     // Save the new order
//     const newOrder = new orderModel({
//       userId: req.body.userId,
//       items: req.body.items,
//       amount: req.body.amount,
//       address: req.body.address,
//     });
//     await newOrder.save();

//     // Clear user's cart
//     await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

//     // Prepare line items for Stripe
//     const line_items = req.body.items.map((item) => ({
//       price_data: {
//         currency: "BDT",
//         product_data: {
//           name: item.name,
//         },
//         unit_amount: Math.round(item.price * 100), // Assuming price is in BDT
//       },
//       quantity: item.quantity,
//     }));

//     // Add delivery charges
//     line_items.push({
//       price_data: {
//         currency: "BDT",
//         product_data: {
//           name: "Delivery Charges",
//         },
//         unit_amount: Math.round(80 * 100), // Delivery charge in BDT
//       },
//       quantity: 1,
//     });

//     // Create Stripe session
//     const session = await stripe.checkout.sessions.create({
//       line_items, // Use correct key
//       mode: "payment",
//       success_url: `${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
//       cancel_url: `${frontendUrl}/verify?success=false&orderId=${newOrder._id}`,
//     });

//     res.json({ success: true, session_url: session.url });
//   } catch (error) {
//     console.log("Error:", error.message); // Enhanced error logging
//     res.status(500).json({ success: false, message: "Error occurred" });
//   }
// };
// //verifying the order
// const verifyOrder = async (req,res)=>{
//      const {orderId,success} = req.body;
//      try{
//       if(success=="true"){
//         //while calling the data we will be passsing them as a string 
//         //if success is true making the payment true
//         await orderModel.findByIdAndUpdate(orderId,{payment:true});
//         res.json({success:true,message:"Successfully Paid"})
//       }else{
//         await orderModel.findByIdAndDelete(orderId);
//         res.json({success:false,message:"Not Paid"})
//       }
//      }
//     catch(error){
//       res.json({success:false,message:"Error Occured"});
//     };
  
// }
// //users order 
// const userOrders = async (req,res)=>{
//   try{
//     const orders = await orderModel.find({userId:req.body.userId}){
       
//     }
//      catch(error){

//     }
//   }
// };
// export default { placeOrder , verifyOrder };


import orderModel from "../Models/orderModel.js";
import userModel from "../Models/userModel.js";
import Stripe from "stripe";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing user order for frontend
const placeOrder = async (req, res) => {
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5174";

  try {
    // Save the new order
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();

    // Clear user's cart
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // Prepare line items for Stripe
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "BDT",
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100), // Assuming price is in BDT
      },
      quantity: item.quantity,
    }));

    // Add delivery charges
    line_items.push({
      price_data: {
        currency: "BDT",
        product_data: { name: "Delivery Charges" },
        unit_amount: Math.round(80 * 100), // Delivery charge in BDT
      },
      quantity: 1,
    });

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontendUrl}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Error in placeOrder:", error.message, error.stack);
    res.status(500).json({ success: false, message: "Error occurred", error: error.message });
  }
};

// Verifying the order
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      // Mark payment as successful
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Successfully Paid" });
    } else {
      // Delete the order if not paid
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.error("Error in verifyOrder:", error.message, error.stack);
    res.status(500).json({ success: false, message: "Error occurred", error: error.message });
  }
};

// User's orders
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("Error in userOrders:", error.message, error.stack);
    res.status(500).json({ success: false, message: "Error fetching orders", error: error.message });
  }
};


//listing orders for the admin panel
const listOrders = async (req,res)=>{
  //fetch all the order details of the user
  try{
    const orders =await orderModel.find({});
    res.json({success:true,data:orders});
  }catch(error){
    console.log(error);
    res.json({success:false,message:"Error"})
  }
};
const updateStatus = async (req,res)=>{
   try{
     await orderModel.findByIdAndUpdate(req.body.orderId,{Status:req.body.Status});
     res.json({success:true,message:"Status Updated!"});
   }catch(error){
    res.json({success:false,message:"Error Occured"});
   console.log(error);
   }
}

export  { placeOrder, verifyOrder, userOrders,listOrders,updateStatus };

