import express from 'express';
import {
  signupController,
  loginController,
  verifyOTPController,
  refreshTokenController,
  getUserController,
  resendOTPController,
} from '../controllers/authController';
import { authMiddleware } from '../middleware/authMiddleware';
import { loginRateLimiter, resendOTPRateLimiter, signupRateLimiter } from '../middleware/rateLimiter';

const router = express.Router();

router.post('/signup', signupRateLimiter, signupController);
router.post('/login', loginRateLimiter, loginController);
router.post('/verify-otp', verifyOTPController);
router.post('/resend-otp', resendOTPRateLimiter, resendOTPController);
router.post('/refresh-token', refreshTokenController);
router.get('/user', authMiddleware, getUserController);

export default router;