import express from "express"
import { getAllAdmin, makeAdmin } from "../controllers/adminController.js";
import { isAdmin, protect } from "../middleware/authMiddleware.js";



const  router =express.Router()

router.get("/admin" , protect,isAdmin , getAllAdmin)
router.put("admin/make-admin/:id" ,protect, isAdmin, makeAdmin)

export default router ;