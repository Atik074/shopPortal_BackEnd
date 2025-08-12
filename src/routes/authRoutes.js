import express from "express";
import { createUser, googleLogin,  userLoggedIn } from "../controllers/authController.js";


const router =express.Router()

router.post("/register" , createUser)
router.post("/login" ,userLoggedIn)
router.post("/google-login" , googleLogin)


export default router;