import jwt from 'jsonwebtoken';
import { config } from './config';

export const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, config.jwtSecret, { expiresIn: '15m' });
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, config.jwtRefreshSecret, { expiresIn: '7d' });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, config.jwtSecret);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, config.jwtRefreshSecret);
};