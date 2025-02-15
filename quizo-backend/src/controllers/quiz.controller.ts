import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../config/database';
import { Quiz } from '../models/Quiz';
import { AppError } from '../middleware/error.middleware';

export const createQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description } = req.body;
    const quizRepository = AppDataSource.getRepository(Quiz);

    const quiz = quizRepository.create({
      title,
      description,
      teacherId: req.user!.id
    });

    await quizRepository.save(quiz);

    res.status(201).json({
      status: 'success',
      data: quiz
    });
  } catch (error) {
    next(error);
  }
};

export const getQuizzes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const quizRepository = AppDataSource.getRepository(Quiz);
    const quizzes = await quizRepository.find({
      where: { teacherId: req.user!.id }
    });

    res.status(200).json({
      status: 'success',
      data: quizzes
    });
  } catch (error) {
    next(error);
  }
};

export const getQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const quizRepository = AppDataSource.getRepository(Quiz);
    const quiz = await quizRepository.findOne({
      where: { 
        id: parseInt(req.params.id),
        teacherId: req.user!.id
      }
    });

    if (!quiz) {
      throw new AppError('Quiz not found', 404);
    }

    res.status(200).json({
      status: 'success',
      data: quiz
    });
  } catch (error) {
    next(error);
  }
};

export const updateQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description } = req.body;
    const quizRepository = AppDataSource.getRepository(Quiz);
    
    const quiz = await quizRepository.findOne({
      where: { 
        id: parseInt(req.params.id),
        teacherId: req.user!.id
      }
    });

    if (!quiz) {
      throw new AppError('Quiz not found', 404);
    }

    quiz.title = title || quiz.title;
    quiz.description = description || quiz.description;

    await quizRepository.save(quiz);

    res.status(200).json({
      status: 'success',
      data: quiz
    });
  } catch (error) {
    next(error);
  }
};

export const deleteQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const quizRepository = AppDataSource.getRepository(Quiz);
    const quiz = await quizRepository.findOne({
      where: { 
        id: parseInt(req.params.id),
        teacherId: req.user!.id
      }
    });

    if (!quiz) {
      throw new AppError('Quiz not found', 404);
    }

    await quizRepository.remove(quiz);

    res.status(200).json({
      status: 'success',
      message: 'Quiz deleted successfully'
    });
  } catch (error) {
    next(error);
  }
}; 