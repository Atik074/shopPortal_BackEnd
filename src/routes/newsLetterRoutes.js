import express from "express"
import {  checkedSubscribeEmail,getSubscriberInNewsLetter } from "../controllers/newsLetterController.js";


const router = express.Router();
router.post("/", getSubscriberInNewsLetter)
router.get("/check", checkedSubscribeEmail)

export default router ;
 