import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../config/database';
import { User } from '../models/User';
import { AppError } from '../middleware/error.middleware';
import bcrypt from 'bcryptjs';

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new AppError('Please provide username and password', 400);
    }

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new AppError('Invalid credentials', 401);
    }

    res.status(200).json({
      status: 'success',
      data: {
        id: user.id,
        username: user.username
      }
    });
  } catch (error) {
    next(error);
  }
}; 