// ��� index.js - Entry point for Express backend
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import cors  from "cors"
import path from "path"
import { fileURLToPath } from "url";
import candidateRoutes from "./routes/candidateRoutes.js"


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173",  
  credentials: true,              
}));


// Routes
app.use("/api/auth", userRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/candidates", candidateRoutes);

app.get('/',(req,res)=>{
  res.status(200).json({
    message:" welcome to vote"
  })
})

mongoose
  .connect('mongodb://localhost:27017/Vote')
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => console.error(err));
