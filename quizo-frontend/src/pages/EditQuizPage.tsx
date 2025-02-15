import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Quiz, QuizFormData } from '../types/quiz.types';
import { quizApi } from '../services/api';
import QuizForm from '../components/quiz/QuizForm';

const EditQuizPage = () => {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchQuiz();
  }, [id]);

  const fetchQuiz = async () => {
    try {
      if (!id) return;
      const response = await quizApi.getOne(parseInt(id));
      setQuiz(response.data);
    } catch (error) {
      console.error('Failed to fetch quiz:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (data: QuizFormData) => {
    try {
      if (!id) return;
      setIsSubmitting(true);
      await quizApi.update(parseInt(id), data);
      navigate('/');
    } catch (error) {
      console.error('Failed to update quiz:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-4rem)] bg-slate-50">
        Loading...
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-4rem)] bg-slate-50">
        Quiz not found
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-4rem)] bg-slate-50">
      <div className="w-full max-w-2xl px-4 py-12 flex flex-col flex-1">
        <h1 className="text-3xl font-bold mb-12">Edit Quiz</h1>
        <div className="flex-1 bg-white rounded-lg shadow-md p-8 border">
          <QuizForm
            initialData={quiz}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
};

export default EditQuizPage; 