import { Article, Filters, SortConfig } from '../types';

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const filterArticles = (articles: Article[], filters: Filters): Article[] => {
  return articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(filters.search.toLowerCase());
    const matchesAuthor = !filters.author || article.author === filters.author;
    const matchesDateFrom = !filters.dateFrom || article.publishedDate >= filters.dateFrom;
    const matchesDateTo = !filters.dateTo || article.publishedDate <= filters.dateTo;
    
    return matchesSearch && matchesAuthor && matchesDateFrom && matchesDateTo;
  });
};

export const sortArticles = (articles: Article[], sortConfig: SortConfig): Article[] => {
  if (!sortConfig.key) return articles;
  
  return [...articles].sort((a, b) => {
    const aValue = a[sortConfig.key!];
    const bValue = b[sortConfig.key!];
    
    // Handle date sorting
    if (sortConfig.key === 'publishedDate') {
      const aDate = new Date(aValue as string);
      const bDate = new Date(bValue as string);
      if (aDate < bDate) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aDate > bDate) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    }
    
    // Handle numeric and string sorting
    if (aValue < bValue) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });
};

export const getUniqueAuthors = (articles: Article[]): string[] => {
  return Array.from(new Set(articles.map(article => article.author))).sort();
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};