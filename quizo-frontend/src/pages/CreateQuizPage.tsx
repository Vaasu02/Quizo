import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizFormData } from '../types/quiz.types';
import { quizApi } from '../services/api';
import QuizForm from '../components/quiz/QuizForm';

const CreateQuizPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data: QuizFormData) => {
    try {
      setIsSubmitting(true);
      await quizApi.create(data);
      navigate('/');
    } catch (error) {
      console.error('Failed to create quiz:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-4rem)] bg-slate-50">
      <div className="w-full max-w-2xl px-4 py-12 flex flex-col flex-1">
        <h1 className="text-3xl font-bold mb-12">Create New Quiz</h1>
        <div className="flex-1 bg-white rounded-lg shadow-md p-8 border">
          <QuizForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </div>
      </div>
    </div>
  );
};

export default CreateQuizPage; 