import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const payload = verifyAccessToken(token) as { userId: string };
    req.user = payload; // TypeScript now recognizes req.user
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};