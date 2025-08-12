import express from "express"
import { createCartProducts, getCartProducts } from "../controllers/cartController.js"
import { protect } from "../middleware/authMiddleware.js"


const router = express.Router()

router.post("/add" , protect , createCartProducts)
router.get("/" , getCartProducts)


export default router ;