import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/use-toast';
import { Quiz } from '../types/quiz.types';
import { quizApi } from '../services/api';
import QuizCard from '../components/quiz/QuizCard';
import { Button } from '../components/ui/button';
import QuizCardSkeleton from '../components/quiz/QuizCardSkeleton';

const DashboardPage = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await quizApi.getAll();
      setQuizzes(response.data);
    } catch (error) {
      console.error('Failed to fetch quizzes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/quiz/edit/${id}`);
  };

  const handleDelete = async (id: number) => {
    try {
      await quizApi.delete(id);
      setQuizzes(quizzes.filter(quiz => quiz.id !== id));
      toast({
        title: "Success",
        description: "Quiz deleted successfully!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete quiz. Please try again.",
      });
    }
  };

  if (loading) {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Quizzes</h1>
          <Button disabled>Create New Quiz</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <QuizCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Quizzes</h1>
        <Button onClick={() => navigate('/quiz/new')}>
          Create New Quiz
        </Button>
      </div>

      {quizzes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No quizzes found. Create your first quiz!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <QuizCard
              key={quiz.id}
              quiz={quiz}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage; 