import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";
import express from "express";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import z from "zod";
import { UserModel } from "../models/userModel.js";

const userRouter = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

userRouter.post("/signup", async (req, res) => {
  try {
    const signupSchema = z.object({
      firstName: z.string().min(1),
      lastName: z.string().min(1),
      email: z.string().email(),
      password: z.string().min(8),
    });

    const parsedSignupSchema = signupSchema.safeParse(req.body);
    if (!parsedSignupSchema.success) {
      return res.status(400).json({
        error: "Invalid input format",
      });
    }

    const { firstName, lastName, email, password } = parsedSignupSchema.data;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        error: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      message: "Signed up successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const loginSchema = z.object({
      email: z.string().email(),
      password: z.string().min(8),
    });

    const parsedLoginSchema = loginSchema.safeParse(req.body);
    if (!parsedLoginSchema.success) {
      return res.status(400).json({
        error: "Invalid input format",
      });
    }

    const { email, password } = parsedLoginSchema.data;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        error: "Incorrect email or password",
      });
    }

    const isSamePassword = await bcrypt.compare(password, user.password);
    if (!isSamePassword) {
      return res.status(401).json({
        error: "Incorrect email or password",
      });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    return res.status(200).json({
      message: "Logged in successfully",
      firstName: user.firstName,
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
});

userRouter.post("/forgot-password", async (req, res) => {
  try {
    const forgotPasswordSchema = z.object({
      email: z.string().email(),
    });

    const parsedForgotPasswordSchema = forgotPasswordSchema.safeParse(req.body);
    if (!parsedForgotPasswordSchema.success) {
      return res.status(400).json({
        error: "Invalid input format",
      });
    }

    const { email } = parsedForgotPasswordSchema.data;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const resetToken = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "10m",
    });

    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: `${process.env.NAME} <${process.env.GMAIL}>`,
      to: `${user.firstName} <${email}>`,
      subject: "Password Reset",
      html: `<div>
                <h1>Reset Password</h1>
                <p>
                  A password reset event has been triggered. The password reset window
                  is limited to 10 minutes. If you do not reset your password within
                  10 minutes, you will need to submit a new request. To complete the
                  password reset process, visit the following link:
                </p>
                <p>${resetLink}</p>
              </div>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "An email has been sent for password reset",
    });
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong",
    });
  }
});

userRouter.post("/reset-password/:resetToken", async (req, res) => {
  const { resetToken } = req.params;

  try {
    const resetPasswordSchema = z.object({
      newPassword: z.string().min(8),
    });

    const parsedResetPasswordSchema = resetPasswordSchema.safeParse(req.body);
    if (!parsedResetPasswordSchema.success) {
      return res.status(400).json({
        error: "Invalid input format",
      });
    }

    const { newPassword } = parsedResetPasswordSchema.data;

    let decodedUser;
    try {
      decodedUser = jwt.verify(resetToken, JWT_SECRET);
    } catch (error) {
      return res.status(400).json({
        error: "Invalid or expired token",
      });
    }

    const userId = decodedUser.id;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return res.status(400).json({
        error: "New password must be different",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await UserModel.findByIdAndUpdate(userId, { password: hashedPassword });

    res.status(200).json({
      message: "Password reset successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong",
    });
  }
});

export { userRouter };
