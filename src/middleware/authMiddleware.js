import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";


export const protect =async(req,res,next)=>{
   const token = req.headers.authorization?.split(" ")[1];
 

    if(!token) return res.status(401).json({message:"No token,Authorized denied"})

        try{
           const decoded = jwt.verify(token , process.env.JWT_SECRET)
           const user = await userModel.findById(decoded.userId).select("-password")


           if(!user){
            return res.status(401).json({message:"User not found"})
           }
              
          req.userId = decoded.userId;
           req.user = user
        

           next()


        }catch(err){
           res.status(401).json({ message: "Invalid token" });
        }

}


//for admin pannel
export const isAdmin =(req,res,next)=>{
    if(req.user.role !== "admin"){
        return res.status(401).json({message:"Admin access only"})
    }

    next()

}
