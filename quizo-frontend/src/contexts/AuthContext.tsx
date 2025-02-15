import { createContext, useContext, useState, ReactNode } from 'react';
import { AuthContextType, User, LoginCredentials } from '../types/auth.types';
import { authApi } from '../services/api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (credentials: LoginCredentials) => {
    const response = await authApi.login(credentials);
    setUser(response.data);
    localStorage.setItem('username', response.data.username);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('username');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 