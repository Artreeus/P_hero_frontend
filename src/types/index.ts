export interface Article {
  id: string;
  title: string;
  author: string;
  publishedDate: string;
  views: number;
  likes: number;
  comments: number;
  content: string;
  status: 'Published' | 'Draft';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor';
  token: string;
}

export interface PerformanceData {
  date: string;
  views: number;
  likes: number;
  comments: number;
}

export interface Filters {
  author: string;
  dateFrom: string;
  dateTo: string;
  search: string;
}

export interface SortConfig {
  key: keyof Article | null;
  direction: 'asc' | 'desc';
}

export interface DashboardContextType {
  articles: Article[];
  filteredArticles: Article[];
  performanceData: PerformanceData[];
  filters: Filters;
  sortConfig: SortConfig;
  currentPage: number;
  itemsPerPage: number;
  user: User | null;
  setFilters: (filters: Partial<Filters>) => void;
  setSortConfig: (config: SortConfig) => void;
  setCurrentPage: (page: number) => void;
  updateArticle: (id: string, updates: Partial<Article>) => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}