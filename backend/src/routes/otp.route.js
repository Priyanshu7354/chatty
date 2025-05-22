import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

// Temporary in-memory OTP storage
let otpStorage = {};

// Send OTP
router.post("/send-otp", async (req, res) => {
  const email = req.body.email?.trim().toLowerCase();

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);
  otpStorage[email] = otp;

  console.log("Generated OTP:", otp);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending OTP", error });
  }
});

// Verify OTP
router.post("/verify-otp", (req, res) => {
  const email = req.body.email?.trim().toLowerCase();
  const otp = req.body.otp;

  console.log("Received verification request:");
  console.log("Email:", email);
  console.log("Entered OTP:", otp);
  console.log("Stored OTP:", otpStorage[email]);

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  if (otpStorage[email] && otpStorage[email].toString() === otp.toString()) {
    delete otpStorage[email]; // Remove OTP after successful verification
    return res.status(200).json({ message: "OTP verified successfully" });
  } else {
    return res.status(400).json({ message: "Invalid OTP" });
  }
});

export default router;
