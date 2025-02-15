import { Request, Response, NextFunction } from 'express';
import { AppError } from './error.middleware';
import { AppDataSource } from '../config/database';
import { User } from '../models/User';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const username = req.headers.username as string;
    
    if (!username) {
      throw new AppError('Authentication required', 401);
    }

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { username } });

    if (!user) {
      throw new AppError('User not found', 401);
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}; 