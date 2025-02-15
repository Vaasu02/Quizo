import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { validateQuiz } from '../middleware/validation.middleware';
import {
  createQuiz,
  getQuizzes,
  getQuiz,
  updateQuiz,
  deleteQuiz
} from '../controllers/quiz.controller';

const router = Router();

router.use(authenticate);

router.route('/')
  .get(getQuizzes)
  .post(validateQuiz, createQuiz);

router.route('/:id')
  .get(getQuiz)
  .put(validateQuiz, updateQuiz)
  .delete(deleteQuiz);

export default router; 