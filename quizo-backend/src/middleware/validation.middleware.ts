import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { AppError } from './error.middleware';

export const validateQuiz = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Quiz title is required')
    .isLength({ max: 255 })
    .withMessage('Quiz title must be less than 255 characters'),
  
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Quiz description is required'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(err => err.msg);
      throw new AppError(errorMessages.join(', '), 400);
    }
    next();
  }
]; 