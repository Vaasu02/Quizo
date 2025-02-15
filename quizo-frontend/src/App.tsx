import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastContextProvider } from './contexts/ToastContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CreateQuizPage from './pages/CreateQuizPage';
import EditQuizPage from './pages/EditQuizPage';
import { Toaster } from './components/ui/toaster';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContextProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/quiz/new" element={<CreateQuizPage />} />
              <Route path="/quiz/edit/:id" element={<EditQuizPage />} />
            </Route>
          </Routes>
          <Toaster />
        </ToastContextProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
