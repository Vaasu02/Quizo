import { Quiz } from '../../types/quiz.types';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { formatDate } from '../../lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { useState } from 'react';

interface QuizCardProps {
  quiz: Quiz;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const QuizCard = ({ quiz, onEdit, onDelete }: QuizCardProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDelete = () => {
    onDelete(quiz.id);
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle className="text-xl">{quiz.title}</CardTitle>
          <CardDescription className="mt-2">{quiz.description}</CardDescription>
          <p className="text-sm text-muted-foreground mt-2">
            Created: {formatDate(quiz.createdAt)}
          </p>
        </CardHeader>
        <CardFooter className="mt-auto pt-6">
          <div className="flex gap-2 w-full">
            <Button variant="outline" className="flex-1" onClick={() => onEdit(quiz.id)}>
              Edit
            </Button>
            <Button 
              variant="destructive" 
              className="flex-1"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              Delete
            </Button>
          </div>
        </CardFooter>
      </Card>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-xl">Delete Quiz</DialogTitle>
            <DialogDescription className="text-base">
              Are you sure you want to delete "<span className="font-medium">{quiz.title}</span>"? 
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-6 gap-2">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete Quiz
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QuizCard;