import jwt from "jsonwebtoken";

// convert the token into the userID
const authMiddleware =async(req,res,next)=>{
const {token} =req.headers;
if(!token){
    res.json({success:false,message:"Login First"})
}
try{
    const token_decode =jwt.verify(token,process.env.JWT_SECRET);
    req.body.userId= token_decode.id;
    next();

}
catch(error){
   res.json({success:false,message:"Error"})
}
}
export default authMiddleware;