import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { AppDataSource } from './config/database';
import { createInitialUser } from './utils/createInitialUser';
import authRoutes from './routes/auth.routes';
import quizRoutes from './routes/quiz.routes';
import { errorHandler } from './middleware/error.middleware';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/quizzes', quizRoutes);

// Error handling middleware 
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Database connection and server 
AppDataSource.initialize()
  .then(async () => {
    console.log('Database connected successfully');
    
    // Creating demo user
    await createInitialUser();
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
  }); 