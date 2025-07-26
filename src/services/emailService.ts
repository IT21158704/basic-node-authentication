import nodemailer from 'nodemailer';
import { config } from '../utils/config';

const transporter = nodemailer.createTransport({
  service: config.email.service,
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
});

export const sendOTP = async (email: string, otp: string) => {
  await transporter.sendMail({
    from: config.email.user,
    to: email,
    subject: 'Email Verification OTP',
    text: `Your OTP is ${otp}. It expires in 10 minutes.`,
  });
};