import React, { useCallback } from 'react';
import { Search, Calendar, User } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import { debounce, getUniqueAuthors } from '../utils';

const Filters: React.FC = () => {
  const { articles, filters, setFilters } = useDashboard();
  const authors = getUniqueAuthors(articles);

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setFilters({ search: value });
    }, 300),
    [setFilters]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Filters & Search</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Search Articles
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              id="search"
              type="text"
              placeholder="Search by title..."
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
            Author
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              id="author"
              value={filters.author}
              onChange={(e) => setFilters({ author: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
            >
              <option value="">All Authors</option>
              {authors.map(author => (
                <option key={author} value={author}>{author}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="dateFrom" className="block text-sm font-medium text-gray-700 mb-2">
            From Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              id="dateFrom"
              type="date"
              value={filters.dateFrom}
              onChange={(e) => setFilters({ dateFrom: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        <div>
          <label htmlFor="dateTo" className="block text-sm font-medium text-gray-700 mb-2">
            To Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              id="dateTo"
              type="date"
              value={filters.dateTo}
              onChange={(e) => setFilters({ dateTo: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>
      </div>

      {(filters.search || filters.author || filters.dateFrom || filters.dateTo) && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button
            onClick={() => setFilters({ search: '', author: '', dateFrom: '', dateTo: '' })}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Filters;