import { Card, CardHeader, CardFooter } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

const QuizCardSkeleton = () => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-4 w-1/3 mt-2" />
      </CardHeader>
      <CardFooter className="mt-auto pt-6">
        <div className="flex gap-2 w-full">
          <Skeleton className="h-9 flex-1" />
          <Skeleton className="h-9 flex-1" />
        </div>
      </CardFooter>
    </Card>
  );
};

export default QuizCardSkeleton; 