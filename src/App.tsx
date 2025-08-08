import React from 'react';
import { Toaster } from 'react-hot-toast';
import { DashboardProvider, useDashboard } from './context/DashboardContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const AppContent: React.FC = () => {
  const { user } = useDashboard();

  if (!user) {
    return <Login />;
  }

  return <Dashboard />;
};

function App() {
  return (
    <>
      <DashboardProvider>
        <AppContent />
      </DashboardProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#374151',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </>
  );
}

export default App;