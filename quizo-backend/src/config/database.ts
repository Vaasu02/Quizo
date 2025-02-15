import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User } from '../models/User';
import { Quiz } from '../models/Quiz';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  dropSchema: false, // This will drop all tables and recreate them
  logging: process.env.NODE_ENV === 'development',
  entities: [User, Quiz],
  subscribers: [],
  migrations: [],
});

// Add connection status handlers
AppDataSource.initialize()
  .then(() => {
    console.log('✅ Database Connection: SUCCESS');
    console.log(`📦 Connected to: ${process.env.DB_NAME}`);
    console.log(`🛜 Host: ${process.env.DB_HOST}:${process.env.DB_PORT}`);
  })
  .catch((error) => {
    console.log('❌ Database Connection: FAILED');
    console.error('Error details:', error);
  }); 