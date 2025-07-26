// services/otpService.ts
import OTP from '../models/OTP';
import { sendOTP } from './emailService';

export const generateAndSendOTP = async (email: string) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  // Remove existing OTPs
  await OTP.deleteMany({ email });

  // Save new OTP
  await OTP.create({
    email,
    otp,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
  });

  // Send OTP to user
  await sendOTP(email, otp);
};
