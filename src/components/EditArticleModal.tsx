import React, { useState, useEffect } from 'react';
import { X, Save, AlertCircle, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useDashboard } from '../context/DashboardContext';
import { Article } from '../types';

interface EditArticleModalProps {
  article: Article;
  onClose: () => void;
}

const EditArticleModal: React.FC<EditArticleModalProps> = ({ article, onClose }) => {
  const { updateArticle } = useDashboard();
  const [formData, setFormData] = useState({
    title: article.title,
    content: article.content,
    status: article.status
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    } else if (formData.title.trim().length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    } else if (formData.content.trim().length < 10) {
      newErrors.content = 'Content must be at least 10 characters';
    }

    if (!formData.status) {
      newErrors.status = 'Status is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      updateArticle(article.id, {
        title: formData.title.trim(),
        content: formData.content.trim(),
        status: formData.status as 'Published' | 'Draft'
      });

      setShowSuccess(true);
      toast.success('Article updated successfully!');
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Failed to update article:', error);
      toast.error('Failed to update article');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50 transition-opacity duration-300"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-100">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Edit Article</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {showSuccess && (
          <div className="mx-6 mt-4 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
            <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
            <span className="text-green-700 font-medium">Article updated successfully!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto max-h-[calc(95vh-140px)] sm:max-h-[calc(90vh-140px)]">
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.title ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter article title..."
                disabled={isLoading}
              />
              {errors.title && (
                <div className="mt-2 flex items-center text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.title}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Content *
              </label>
              <textarea
                id="content"
                value={formData.content}
                onChange={(e) => handleChange('content', e.target.value)}
                rows={12}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-vertical ${
                  errors.content ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter article content..."
                disabled={isLoading}
              />
              {errors.content && (
                <div className="mt-2 flex items-center text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.content}
                </div>
              )}
              <div className="mt-2 text-xs text-gray-500 text-right">
                {formData.content.length} characters
              </div>
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                Status *
              </label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.status ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                disabled={isLoading}
              >
                <option value="">Select status...</option>
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </select>
              {errors.status && (
                <div className="mt-2 flex items-center text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.status}
                </div>
              )}
            </div>
          </div>
        </form>

        <div className="flex flex-col sm:flex-row items-center justify-end space-y-2 sm:space-y-0 sm:space-x-3 p-4 sm:p-6 border-t border-gray-200 bg-gray-50">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading || showSuccess}
            onClick={handleSubmit}
            className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditArticleModal;