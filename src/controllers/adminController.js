import userModel from "../models/userModel.js";
import { errorHandler } from "../utils/errorHandler.js";


// handle make admin 
export const makeAdmin =async(req,res)=>{
  const {id} = req.params 


   try{
     const user = await userModel.findByIdAndUpdate(id , {role:"admin"},{new:true})

      res.status(200).json({ message: "User promoted to admin", user });

   }catch(err){
      errorHandler(res , "make admin",  err)
   
   }
}


// handle get all admin
export const getAllAdmin =async(req,res)=>{
   try{
    const allAdmin = await userModel.find({role:'admin'}).select("-password")  
     res.json(allAdmin)

   }catch(err){
      errorHandler(res,"get all admin" , err)
   
   }
   
}
