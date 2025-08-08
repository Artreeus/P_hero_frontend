import React, { useState } from 'react';
import { Edit, Eye, Heart, MessageSquare, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import { formatDate, formatNumber } from '../utils';
import { Article } from '../types';
import EditArticleModal from './EditArticleModal';

const ArticlesTable: React.FC = () => {
  const {
    filteredArticles,
    sortConfig,
    setSortConfig,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    user
  } = useDashboard();
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  const handleSort = (key: keyof Article) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: keyof Article) => {
    if (sortConfig.key !== key) {
      return <ChevronUp className="w-4 h-4 text-gray-300" />;
    }
    return sortConfig.direction === 'asc' 
      ? <ChevronUp className="w-4 h-4 text-blue-600" />
      : <ChevronDown className="w-4 h-4 text-blue-600" />;
  };

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + itemsPerPage);

  const canEdit = user?.role === 'admin';

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Articles</h3>
              <p className="text-sm text-gray-500 mt-1">
                Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredArticles.length)} of {filteredArticles.length} articles
              </p>
            </div>
            <div className="mt-3 sm:mt-0 text-sm text-gray-500">
              Click column headers to sort
            </div>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="block sm:hidden">
          {paginatedArticles.map((article) => (
            <div key={article.id} className="border-b border-gray-200 p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-900 text-sm">{article.title}</h4>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  article.status === 'Published' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {article.status}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-3">{article.author} • {formatDate(article.publishedDate)}</p>
              <div className="flex justify-between items-center text-sm">
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4 text-blue-500" />
                    <span>{formatNumber(article.views)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span>{formatNumber(article.likes)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageSquare className="w-4 h-4 text-green-500" />
                    <span>{formatNumber(article.comments)}</span>
                  </div>
                </div>
                {canEdit && (
                  <button
                    onClick={() => setEditingArticle(article)}
                    className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title & Author
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => handleSort('publishedDate')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Published Date</span>
                    {getSortIcon('publishedDate')}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => handleSort('views')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Views</span>
                    {getSortIcon('views')}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => handleSort('likes')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Likes</span>
                    {getSortIcon('likes')}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => handleSort('comments')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Comments</span>
                    {getSortIcon('comments')}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                {canEdit && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedArticles.map((article) => (
                <tr key={article.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{article.title}</div>
                      <div className="text-sm text-gray-500">{article.author}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(article.publishedDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Eye className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium text-gray-900">{formatNumber(article.views)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span className="text-sm font-medium text-gray-900">{formatNumber(article.likes)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium text-gray-900">{formatNumber(article.comments)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      article.status === 'Published' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {article.status}
                    </span>
                  </td>
                  {canEdit && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => setEditingArticle(article)}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="px-4 sm:px-6 py-3 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="flex items-center justify-center sm:justify-start">
              <p className="text-sm text-gray-700">
                Page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
              </p>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-300 transition-colors duration-200"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline ml-1">Previous</span>
              </button>
              <span className="text-sm text-gray-500 px-2">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-300 transition-colors duration-200"
              >
                <span className="hidden sm:inline mr-1">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {editingArticle && (
        <EditArticleModal
          article={editingArticle}
          onClose={() => setEditingArticle(null)}
        />
      )}
    </>
  );
};

export default ArticlesTable;