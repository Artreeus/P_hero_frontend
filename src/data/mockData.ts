import { Article, PerformanceData, User } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    token: 'admin-token-123'
  },
  {
    id: '2',
    name: 'Editor User',
    email: 'editor@example.com',
    role: 'editor',
    token: 'editor-token-456'
  }
];

export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Getting Started with React Hooks',
    author: 'Sarah Johnson',
    publishedDate: '2024-01-15',
    views: 12540,
    likes: 892,
    comments: 156,
    content: 'React Hooks have revolutionized how we write React components...',
    status: 'Published'
  },
  {
    id: '2',
    title: 'Advanced TypeScript Patterns',
    author: 'Mike Chen',
    publishedDate: '2024-01-12',
    views: 8920,
    likes: 654,
    comments: 89,
    content: 'TypeScript offers powerful patterns for building scalable applications...',
    status: 'Published'
  },
  {
    id: '3',
    title: 'Building Responsive Web Applications',
    author: 'Emma Davis',
    publishedDate: '2024-01-10',
    views: 15230,
    likes: 1203,
    comments: 234,
    content: 'Creating responsive designs that work across all devices...',
    status: 'Published'
  },
  {
    id: '4',
    title: 'State Management Best Practices',
    author: 'Alex Rodriguez',
    publishedDate: '2024-01-08',
    views: 7890,
    likes: 567,
    comments: 123,
    content: 'Managing state effectively is crucial for modern applications...',
    status: 'Draft'
  },
  {
    id: '5',
    title: 'CSS Grid vs Flexbox: When to Use Which',
    author: 'Sarah Johnson',
    publishedDate: '2024-01-05',
    views: 11200,
    likes: 834,
    comments: 178,
    content: 'Understanding the differences between CSS Grid and Flexbox...',
    status: 'Published'
  },
  {
    id: '6',
    title: 'API Design Principles',
    author: 'Mike Chen',
    publishedDate: '2024-01-03',
    views: 6540,
    likes: 445,
    comments: 67,
    content: 'Designing APIs that are intuitive and maintainable...',
    status: 'Published'
  },
  {
    id: '7',
    title: 'Performance Optimization Techniques',
    author: 'Emma Davis',
    publishedDate: '2024-01-01',
    views: 9876,
    likes: 723,
    comments: 145,
    content: 'Optimizing web applications for better performance...',
    status: 'Published'
  },
  {
    id: '8',
    title: 'Modern JavaScript Features',
    author: 'Alex Rodriguez',
    publishedDate: '2023-12-28',
    views: 13450,
    likes: 987,
    comments: 201,
    content: 'Exploring the latest features in modern JavaScript...',
    status: 'Published'
  }
];

export const generatePerformanceData = (): PerformanceData[] => {
  const data: PerformanceData[] = [];
  const startDate = new Date('2024-01-01');
  const endDate = new Date('2024-01-15');
  
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    data.push({
      date: d.toISOString().split('T')[0],
      views: Math.floor(Math.random() * 5000) + 1000,
      likes: Math.floor(Math.random() * 500) + 50,
      comments: Math.floor(Math.random() * 100) + 10
    });
  }
  
  return data;
};

export const mockPerformanceData = generatePerformanceData();