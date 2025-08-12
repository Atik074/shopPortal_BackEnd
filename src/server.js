import express from "express";
import dotenv from "dotenv";
import cors from "cors";
const PORT = process.env.PORT || 5000;
import dbConnect from './config/database.js';
import productRoutes from "./routes/productRoutes.js";
import newsLetterRoutes from "./routes/newsLetterRoutes.js"
import cartProductRoutes from "./routes/cartProductRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"




dotenv.config();
dbConnect()
const app = express()
app.use(cors())
app.use(express.json())


app.use('/api' , productRoutes)

//create auth user in databsae
app.use('/api/auth' , authRoutes)
//for newslatter
app.use('/api/newsletter' , newsLetterRoutes)
//for cart products save in database
app.use('/api/cart' , cartProductRoutes)

//for make admin 
 app.use('/api', adminRoutes)

app.get('/' ,(req,res)=>{

 res.send('server is runining...')

})



app.listen(PORT, () => console.log(`Server started on port ${PORT}`));