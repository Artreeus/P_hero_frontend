import React from 'react';
import { LogOut, BarChart3, FileText, User, Shield } from 'lucide-react';
import toast from 'react-hot-toast';
import { useDashboard } from '../context/DashboardContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useDashboard();

  const handleLogout = () => {
    logout();
    toast.success('Successfully logged out!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
              </div>
              <h1 className="ml-3 text-lg sm:text-xl font-semibold text-gray-900 truncate">Content Dashboard</h1>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  {user?.role === 'admin' ? (
                    <Shield className="w-4 h-4 text-blue-600" />
                  ) : (
                    <User className="w-4 h-4 text-gray-600" />
                  )}
                </div>
                <div className="hidden sm:block">
                  <div className="text-sm font-medium text-gray-900">{user?.name}</div>
                  <div className="text-xs text-gray-500 capitalize hidden md:block">{user?.role}</div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-2 sm:px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-4 sm:py-6 px-2 sm:px-6 lg:px-8">
        <div className="py-2 sm:py-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;