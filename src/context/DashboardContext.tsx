import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { DashboardContextType, Article, Filters, SortConfig, User } from '../types';
import { mockArticles, mockPerformanceData, mockUsers } from '../data/mockData';
import { filterArticles, sortArticles } from '../utils';

interface DashboardState {
  articles: Article[];
  filteredArticles: Article[];
  performanceData: any[];
  filters: Filters;
  sortConfig: SortConfig;
  currentPage: number;
  itemsPerPage: number;
  user: User | null;
}

type DashboardAction = 
  | { type: 'SET_FILTERS'; payload: Partial<Filters> }
  | { type: 'SET_SORT_CONFIG'; payload: SortConfig }
  | { type: 'SET_CURRENT_PAGE'; payload: number }
  | { type: 'UPDATE_ARTICLE'; payload: { id: string; updates: Partial<Article> } }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'UPDATE_FILTERED_ARTICLES'; payload: Article[] };

const initialState: DashboardState = {
  articles: mockArticles,
  filteredArticles: mockArticles,
  performanceData: mockPerformanceData,
  filters: {
    author: '',
    dateFrom: '',
    dateTo: '',
    search: ''
  },
  sortConfig: { key: null, direction: 'asc' },
  currentPage: 1,
  itemsPerPage: 5,
  user: null
};

const dashboardReducer = (state: DashboardState, action: DashboardAction): DashboardState => {
  switch (action.type) {
    case 'SET_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
        currentPage: 1
      };
    case 'SET_SORT_CONFIG':
      return {
        ...state,
        sortConfig: action.payload
      };
    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.payload
      };
    case 'UPDATE_ARTICLE':
      const updatedArticles = state.articles.map(article =>
        article.id === action.payload.id
          ? { ...article, ...action.payload.updates }
          : article
      );
      return {
        ...state,
        articles: updatedArticles
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload
      };
    case 'UPDATE_FILTERED_ARTICLES':
      return {
        ...state,
        filteredArticles: action.payload
      };
    default:
      return state;
  }
};

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  useEffect(() => {
    const stored = localStorage.getItem('dashboardUser');
    if (stored) {
      dispatch({ type: 'SET_USER', payload: JSON.parse(stored) });
    }
  }, []);

  useEffect(() => {
    const filtered = filterArticles(state.articles, state.filters);
    const sorted = sortArticles(filtered, state.sortConfig);
    dispatch({ type: 'UPDATE_FILTERED_ARTICLES', payload: sorted });
  }, [state.articles, state.filters, state.sortConfig]);

  const setFilters = (filters: Partial<Filters>) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };

  const setSortConfig = (config: SortConfig) => {
    dispatch({ type: 'SET_SORT_CONFIG', payload: config });
  };

  const setCurrentPage = (page: number) => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
  };

  const updateArticle = (id: string, updates: Partial<Article>) => {
    dispatch({ type: 'UPDATE_ARTICLE', payload: { id, updates } });
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    const user = mockUsers.find(u => u.email === email);
    if (user && password === 'password') {
      localStorage.setItem('dashboardUser', JSON.stringify(user));
      dispatch({ type: 'SET_USER', payload: user });
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('dashboardUser');
    dispatch({ type: 'SET_USER', payload: null });
  };

  const value: DashboardContextType = {
    ...state,
    setFilters,
    setSortConfig,
    setCurrentPage,
    updateArticle,
    login,
    logout
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = (): DashboardContextType => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};