import express from 'express';
import { addFood,listFood,removeFood } from '../Controllers/foodController.js';
import multer from 'multer';

const foodRouter =express.Router();
//image storage engine

const storage =multer.diskStorage({
    destination:"Uploads",
    filename:(req,file,addImage)=>{
        return addImage(null,`${Date.now()}${file.originalname}`)
        //file.originalname will create a unique name
    }
})
//middleware
const upload = multer({storage:storage});
foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.get("/list",listFood);
foodRouter.post('/remove',removeFood)


















export default foodRouter;