import { createContext, useContext, useState } from 'react';
import { ToastProvider as RadixToastProvider, Toast, ToastViewport } from '../components/ui/toast';

interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'error') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Array<{ id: number; message: string; type: string }>>([]);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <RadixToastProvider>
        {children}
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            variant={toast.type === 'error' ? 'destructive' : 'default'}
          >
            {toast.message}
          </Toast>
        ))}
        <ToastViewport />
      </RadixToastProvider>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastContextProvider');
  }
  return context;
}; 