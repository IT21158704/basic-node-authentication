import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import { config } from './utils/config';

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);

const startServer = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    console.log('Connected to MongoDB');
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (error) {
    console.error('Server error:', error);
  }
};

startServer();