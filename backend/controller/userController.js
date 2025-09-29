import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { UserModel } from "../model/User.js";

export const signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      email,
      password: hashedPassword,
      name,
    });

    await newUser.save();

    res.status(201).json({ message: "Signup successful", userId: newUser._id });
  } catch (err) {
    console.log(err.message);

    res.status(500).json({ massage: `${err.message}` });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      "gv_ByL5jjddmCa_bffT1jgvkRSzFZMztoa2IClqbsBg",
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Login successful", token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const profile = async (req, res) => {
  res.json({ message: "Access granted", user: req.user });
};

export const getAllUsers = async (req, res) => {
  const users = await UserModel.find();

  const now = new Date();
    const currentMonth = now.getMonth(); // 0–11
    const currentYear = now.getFullYear();

    // Count users created in this month
    const newThisMonth = users.filter((u) => {
      const created = new Date(u.createdAt);
      return created.getMonth() === currentMonth && created.getFullYear() === currentYear;
    }).length;
  const totalUsers = users.length;
  const totalAdmins = users.filter((u) => u.role === "admin").length;
  const bannedThisMonth = users.filter((u) => {
    return (
      u.status === "banned" &&
      u.createdAt >=
        new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    );
  }).length;



  res.status(200).json({
    success: true,
    users,
    stats: {
      totalUsers,
      totalAdmins,
      bannedThisMonth,
      newThisMonth 
    },
  });
};

export const logout = async (req, res) => {
  try {
    // Clear the token cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout failed",
      error: error.message,
    });
  }
};

