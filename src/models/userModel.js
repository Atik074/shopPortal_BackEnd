import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema({
    name:String ,
    email:{
        type:String ,
        required:true ,
        unique:true
    },

     password: {
      type: String,
      required: function () {
        return !this.googleAuth; 
      },
      select: false, 
    },
    googleAuth: {
      type: Boolean,
      default: false, 
    },


    role:{
        type:String ,
        enum:["user" ,"admin"],
        default:"user"
    }

},
{timestamps:true}
)

    //pre save midleware to create passwprd hashed
     userSchema.pre("save" , async function(next){
         const modifiedPassword = this.isModified("password")
      
         if(!modifiedPassword){
           return next()
        } 
         
        this.password = await bcrypt.hash(this.password ,10)
        next()

      })


//password compared
   userSchema.methods.comparePassword = function (password){
    return bcrypt.compare(password , this.password)

   }




 const userModel = mongoose.models.user ||  mongoose.model("user" , userSchema)

 export default userModel ;