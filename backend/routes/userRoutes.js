// ���️ userRoutes.js - Express routes for user login/register
import express from "express";
import { signup, login,profile, getAllUsers, logout } from "../controller/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me",authMiddleware,profile );
router.get("/users",authMiddleware,getAllUsers );
router.post('/logout',authMiddleware,logout)

export default router;
 