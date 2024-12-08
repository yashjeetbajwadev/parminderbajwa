import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const AlertContext = createContext<{
  callAlert: (title: string, description: string) => void;
} | undefined>(undefined);

export const useAlert: () => { callAlert: (title: string, description: string) => void } = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alert, setAlert] = useState({ show: false, title: '', description: '' });

  const callAlert = useCallback((title: string, description: string) => {
    setAlert({ show: true, title, description });
  }, []);

  useEffect(() => {
    if (alert.show) {
      const timer = setTimeout(() => {
        setAlert((prev) => ({ ...prev, show: false }));
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [alert.show]);

  return (
    <AlertContext.Provider value={{ callAlert }}>
      {children}
      {alert.show && (
        <Alert className="bg-slate-800 text-white w-80 animate-bounce h-fit z-99999 fixed inset-0 mx-auto inset-y-10" variant="default">
          <AlertTitle>{alert.title}</AlertTitle>
          <AlertDescription>{alert.description}</AlertDescription>
        </Alert>
      )}
    </AlertContext.Provider>
  );
};