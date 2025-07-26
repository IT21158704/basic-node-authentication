import bcrypt from 'bcrypt';
import User from '../models/User';
import OTP from '../models/OTP';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt';
import { generateAndSendOTP } from './otpService';

export const signup = async (email: string, password: string) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });
  await user.save();

  await generateAndSendOTP(email);

  return { userId: user._id };
};

export const login = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user || !user.isVerified) throw new Error('Invalid credentials or email not verified');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);
  return { accessToken, refreshToken, userId: user._id };
};

export const verifyOTP = async (email: string, otp: string) => {
  const otpRecord = await OTP.findOne({ email, otp });
  if (!otpRecord || otpRecord.expiresAt < new Date()) throw new Error('Invalid or expired OTP');

  await User.updateOne({ email }, { isVerified: true });
  await OTP.deleteOne({ email, otp });
};

export const resendOTP = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');
  if (user.isVerified) throw new Error('Email already verified');
  
  await OTP.deleteMany({ email });

  await generateAndSendOTP(email);

  return { message: 'New OTP sent to email' };
};

export const refreshTokenFn = async (refreshToken: string) => {
  const payload = verifyRefreshToken(refreshToken) as { userId: string };
  const user = await User.findById(payload.userId);
  if (!user) throw new Error('Invalid refresh token');

  const accessToken = generateAccessToken(user._id);
  return { accessToken };
};

export const getUser = async (userId: string) => {
  const user = await User.findById(userId, 'email isVerified');
  if (!user) throw new Error('User not found');
  return user;
};