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

//for production
app.get('/',(req,res)=>{
  res.send('Server started in production');
})

// Database connection and server 
AppDataSource.initialize()
  .then(async () => {
    console.log('\n=== Database & Server Status ===');
    console.log('✅ Database Connection: SUCCESS');
    console.log(`📦 Database: ${process.env.DB_NAME}`);
    
    // Creating demo user
    await createInitialUser();
    console.log('👤 Demo User: Created');
    
    app.listen(PORT, () => {
      console.log(`🚀 Server: Running on port ${PORT}`);
      console.log('===============================\n');
    });
  })
  .catch((error) => {
    console.log('\n=== Error Report ===');
    console.log('❌ Database Connection: FAILED');
    console.error('Error details:', error);
    console.log('==================\n');
  }); 