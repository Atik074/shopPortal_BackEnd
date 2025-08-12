import newsLetterModel from "../models/newsLetterModel.js";
import { errorHandler } from "../utils/errorHandler.js";

export const getSubscriberInNewsLetter = async (req, res) => {
  try {
    const { email } = req.body;
    const allereadyExists = await newsLetterModel.findOne({ email });

    if (allereadyExists) {
      return res.status(400).json({ message: "You are already subscribed!" });
    }
    await newsLetterModel.create({ email });
    res.status(201).json({ message: "Subscribed successfully!" });
  } catch (err) {
     errorHandler(res , "news letter" , err)
    
  }
};



export const checkedSubscribeEmail = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const existsEmail = await newsLetterModel.findOne({ email });

  if (existsEmail) {
    return res.status(200).json({ subscribed: true });
  } else {
    return res.status(200).json({ subscribed: false });
  }
};
