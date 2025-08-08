import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, BarChart3, Calendar } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, eachMonthOfInterval, parseISO } from 'date-fns';

type ViewType = 'daily' | 'monthly';
type ChartType = 'line' | 'bar';

const PerformanceChart: React.FC = () => {
  const { performanceData, filteredArticles } = useDashboard();
  const [viewType, setViewType] = useState<ViewType>('daily');
  const [chartType, setChartType] = useState<ChartType>('line');

  const chartData = useMemo(() => {
    if (viewType === 'daily') {
      return performanceData.map(item => ({
        ...item,
        date: format(parseISO(item.date), 'MMM dd')
      }));
    } else {
      // Group by month
      const monthlyData = performanceData.reduce((acc, item) => {
        const month = format(parseISO(item.date), 'yyyy-MM');
        if (!acc[month]) {
          acc[month] = { views: 0, likes: 0, comments: 0, count: 0 };
        }
        acc[month].views += item.views;
        acc[month].likes += item.likes;
        acc[month].comments += item.comments;
        acc[month].count += 1;
        return acc;
      }, {} as Record<string, { views: number; likes: number; comments: number; count: number }>);

      return Object.entries(monthlyData).map(([month, data]) => ({
        date: format(parseISO(`${month}-01`), 'MMM yyyy'),
        views: Math.round(data.views / data.count),
        likes: Math.round(data.likes / data.count),
        comments: Math.round(data.comments / data.count)
      }));
    }
  }, [performanceData, viewType]);

  const totalStats = useMemo(() => {
    return filteredArticles.reduce(
      (acc, article) => ({
        views: acc.views + article.views,
        likes: acc.likes + article.likes,
        comments: acc.comments + article.comments
      }),
      { views: 0, likes: 0, comments: 0 }
    );
  }, [filteredArticles]);

  const ChartComponent = chartType === 'line' ? LineChart : BarChart;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
            Performance Analytics
          </h3>
          <p className="text-sm text-gray-500 mt-1">Article engagement over time</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0">
          <div className="flex rounded-lg border border-gray-300 p-1">
            <button
              onClick={() => setViewType('daily')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 ${
                viewType === 'daily'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Calendar className="w-4 h-4 inline mr-1" />
              Daily
            </button>
            <button
              onClick={() => setViewType('monthly')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 ${
                viewType === 'monthly'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Calendar className="w-4 h-4 inline mr-1" />
              Monthly
            </button>
          </div>

          <div className="flex rounded-lg border border-gray-300 p-1">
            <button
              onClick={() => setChartType('line')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 ${
                chartType === 'line'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <TrendingUp className="w-4 h-4 inline mr-1" />
              Line
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 ${
                chartType === 'bar'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <BarChart3 className="w-4 h-4 inline mr-1" />
              Bar
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-blue-900">Total Views</p>
              <p className="text-lg font-semibold text-blue-600">{totalStats.views.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-900">Total Likes</p>
              <p className="text-lg font-semibold text-red-600">{totalStats.likes.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-900">Total Comments</p>
              <p className="text-lg font-semibold text-green-600">{totalStats.comments.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="h-64 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ChartComponent data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value: any) => [value.toLocaleString(), '']}
            />
            <Legend />
            
            {chartType === 'line' ? (
              <>
                <Line 
                  type="monotone" 
                  dataKey="views" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                  name="Views"
                />
                <Line 
                  type="monotone" 
                  dataKey="likes" 
                  stroke="#ef4444" 
                  strokeWidth={3}
                  dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#ef4444', strokeWidth: 2 }}
                  name="Likes"
                />
                <Line 
                  type="monotone" 
                  dataKey="comments" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
                  name="Comments"
                />
              </>
            ) : (
              <>
                <Bar dataKey="views" fill="#3b82f6" name="Views" radius={[2, 2, 0, 0]} />
                <Bar dataKey="likes" fill="#ef4444" name="Likes" radius={[2, 2, 0, 0]} />
                <Bar dataKey="comments" fill="#10b981" name="Comments" radius={[2, 2, 0, 0]} />
              </>
            )}
          </ChartComponent>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;