import express from "express";
import { userLogin, registeredUser } from "../Controllers/userController.js"; 


const userRouter =express.Router();

userRouter.post("/register",registeredUser);
userRouter.post("/login", userLogin );
export default userRouter;
