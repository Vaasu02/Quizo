import axios from 'axios';
import { LoginCredentials } from '../types/auth.types';
import { QuizFormData } from '../types/quiz.types';

const api = axios.create({
  baseURL: 'https://quizo-j6s3.onrender.com/api'
});

api.interceptors.request.use((config) => {
  const username = localStorage.getItem('username');
  if (username) {
    config.headers.username = username;
  }
  return config;
});

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  }
};

export const quizApi = {
  getAll: async () => {
    const response = await api.get('/quizzes');
    return response.data;
  },
  getOne: async (id: number) => {
    const response = await api.get(`/quizzes/${id}`);
    return response.data;
  },
  create: async (quiz: QuizFormData) => {
    const response = await api.post('/quizzes', quiz);
    return response.data;
  },
  update: async (id: number, quiz: QuizFormData) => {
    const response = await api.put(`/quizzes/${id}`, quiz);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/quizzes/${id}`);
    return response.data;
  }
};

export default api; 