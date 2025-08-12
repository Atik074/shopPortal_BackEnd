import admin from "../config/firebase/fireAdmin.js";
import userModel from "../models/userModel.js";
import { errorHandler } from "../utils/errorHandler.js";
import createJwtToken from "../utils/tokenGenerator.js";

export const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const isExistUser = await userModel.findOne({ email });

    if (isExistUser)
      return res.status(400).json({ message: "User already registered" });

    const user = await userModel.create({ name, email, password, role });

    const token = createJwtToken(user);

    // remove password to send front end
    const userInfo = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.rol,
    };

    res.status(200).json({ user: userInfo, token });
  } catch (err) {
    errorHandler(res ,"user registratoin" , err)
    
  }
};

export const userLoggedIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatchPassword = await user.comparePassword(password);

    if (!isMatchPassword)
      return res.status(400).json({ message: "Invalid credentials" });

    // token generator
    const token = createJwtToken(user);
    const userInfo = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    res.status(200).json({ user: userInfo, token });
  } catch (err) {
     errorHandler(res ,"user login" , err)
    
  }
};

// hadle google login
export const googleLogin = async (req, res) => {
  const { token } = req.body;
     
  if (!token) {
    return res.status(400).json({ message: "Token missing" });
  }

  try {
    const verifiedToken = await admin.auth().verifyIdToken(token);

    const { email, name, picture } = verifiedToken;

    let user = await userModel.findOne({ email });

    if (!user) {
      user = await userModel.create({
        name,
        email,
        password: "",
        googleAuth: true,
        role: "user",
        avater: picture,
      });
    }

    const tokenForAuth = createJwtToken(user);

    const userInfo = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avater: user.avater || picture,
    };

    res.status(200).json({
      user: userInfo,
      token: tokenForAuth,
    });
  } catch (err) {
     errorHandler(res ,"google login" , err)
    
  }
};
