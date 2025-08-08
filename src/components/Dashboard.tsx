import React from 'react';
import Layout from './Layout';
import Filters from './Filters';
import PerformanceChart from './PerformanceChart';
import ArticlesTable from './ArticlesTable';

const Dashboard: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="mt-2 text-gray-600">
            Monitor and manage your content performance with detailed analytics and insights.
          </p>
        </div>

        <Filters />
        <PerformanceChart />
        <ArticlesTable />
      </div>
    </Layout>
  );
};

export default Dashboard;