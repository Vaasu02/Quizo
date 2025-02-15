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