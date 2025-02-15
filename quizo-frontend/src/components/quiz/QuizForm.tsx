import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { QuizFormData } from '../../types/quiz.types';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form';
import { Textarea } from '../ui/textarea';

interface QuizFormProps {
  initialData?: QuizFormData;
  onSubmit: (data: QuizFormData) => Promise<void>;
  isSubmitting?: boolean;
}

const quizSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(255, 'Title must be less than 255 characters'),
  description: z.string()
    .min(1, 'Description is required')
});

const QuizForm = ({ initialData, onSubmit, isSubmitting }: QuizFormProps) => {
  const form = useForm<QuizFormData>({
    resolver: zodResolver(quizSchema),
    defaultValues: initialData || {
      title: '',
      description: ''
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg mb-4 block">Title</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter quiz title" 
                  className="h-12 text-lg mt-2" 
                  {...field} 
                />
              </FormControl>
              <FormMessage className="mt-2" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className="text-lg mb-4 block">Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter quiz description"
                  className="min-h-[200px] text-lg resize-none mt-2"
                  {...field}
                />
              </FormControl>
              <FormMessage className="mt-2" />
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          className="w-full h-12 text-lg mt-8" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save Quiz'}
        </Button>
      </form>
    </Form>
  );
};

export default QuizForm; 