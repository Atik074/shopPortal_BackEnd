import mongoose, { Schema } from "mongoose";

const newsLetterSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, 'Please provide a valid email address'],
    },
    subscribed: {
      type: Boolean,
      default: true,  
    },
    subscribedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const newsLetterModel = mongoose.models.subscriber || mongoose.model("subscriber" , newsLetterSchema)

export default newsLetterModel ;