// import mongoose from "mongoose";

// //database connection
// export const connectDB =async()=>{
//     await mongoose.connect("mongodb+srv://MyshaSamiha:2020952@cluster0.biory.mongodb.net/FoodieBay").then(()=>
//         console.log("db connected"))
// };



import mongoose from "mongoose";

// Database connection
export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://MyshaSamiha:2020952@cluster0.biory.mongodb.net/FoodieBay", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1); // Exit the application if the database connection fails
    }
};
 
