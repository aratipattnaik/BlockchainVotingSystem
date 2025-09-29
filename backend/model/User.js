// ��� User.js - Mongoose model for User
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["user", "candidate", "admin"],
      default: "user",
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    image: {
      type: String,
      default:
        "https://cdn.dribbble.com/userupload/29736698/file/original-1ef955c551eede8401da24a210ad3a86.jpg?resize=752x&vertical=center",
    },
    mobile:{
      type:String,
      default:null
    },
    name: {
      type: String,
      required: true,
    },
    age: { type: Number },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    phone: { type: String },
    address: {
      village: String,
      district: String,
      state: String,
      pincode: String,
    },

    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("User", userSchema);
