import { Request, Response } from 'express';
import { signup, login, verifyOTP, refreshTokenFn, getUser, resendOTP } from '../services/authService';

export const signupController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await signup(email, password);
    res.status(201).json({ message: 'User created, OTP sent to email', userId: result.userId });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await login(email, password);
    res.json(result);
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
};

export const verifyOTPController = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    await verifyOTP(email, otp);
    res.json({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const resendOTPController = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const result = await resendOTP(email);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const refreshTokenController = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    const result = await refreshTokenFn(refreshToken);
    res.json(result);
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
};

export const getUserController = async (req: Request, res: Response) => {
  try {
    const user = await getUser(req.user!.userId);
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: (error as Error).message });
  }
};