export interface Quiz {
  id: number;
  title: string;
  description: string;
  teacherId: number;
  createdAt: string;
  updatedAt: string;
}

export interface QuizFormData {
  title: string;
  description: string;
} 