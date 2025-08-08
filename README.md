# Admin Dashboard with Content Management

A modern, responsive admin dashboard built with React, TypeScript, and Tailwind CSS for managing content and analyzing performance metrics.

![Dashboard Preview](https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop)

## ✨ Features

### 🔐 Authentication
- Secure login system with role-based access control
- Admin and Editor user roles with different permissions
- Demo accounts for easy testing
- Persistent login sessions with localStorage

### 📊 Dashboard Analytics
- Interactive performance charts (Line & Bar charts)
- Real-time metrics for views, likes, and comments
- Daily and monthly data visualization
- Responsive chart components using Recharts

### 📝 Content Management
- Complete article management system
- Advanced filtering and search capabilities
- Sortable columns with visual indicators
- Pagination for large datasets
- Inline editing for administrators

### 🎨 Modern UI/UX
- Clean, professional design with Tailwind CSS
- Fully responsive layout (mobile-first approach)
- Smooth animations and micro-interactions
- Toast notifications for user feedback
- Accessible components with proper ARIA labels

### 🔍 Advanced Features
- Real-time search with debounced input
- Multi-criteria filtering (author, date range, status)
- Export-ready data visualization
- Keyboard shortcuts and navigation
- Error handling and loading states

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd admin-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔑 Demo Accounts

The application comes with pre-configured demo accounts:

### Admin Account
- **Email:** `admin@example.com`
- **Password:** `password`
- **Permissions:** Full access including article editing

### Editor Account
- **Email:** `editor@example.com`
- **Password:** `password`
- **Permissions:** Read-only access to dashboard and analytics

## 📱 Responsive Design

The dashboard is fully responsive and optimized for:
- **Desktop:** Full-featured layout with sidebar navigation
- **Tablet:** Adaptive layout with collapsible elements
- **Mobile:** Card-based layout with touch-friendly interactions

## 🛠️ Technology Stack

### Frontend Framework
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development with excellent IDE support
- **Vite** - Fast build tool and development server

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful, customizable icons
- **React Hot Toast** - Elegant toast notifications

### Data Visualization
- **Recharts** - Composable charting library built on React components
- **Date-fns** - Modern JavaScript date utility library

### State Management
- **React Context** - Built-in state management with useReducer
- **Local Storage** - Persistent user sessions

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Dashboard.tsx    # Main dashboard layout
│   ├── Login.tsx        # Authentication component
│   ├── Layout.tsx       # App layout wrapper
│   ├── Filters.tsx      # Search and filter controls
│   ├── ArticlesTable.tsx # Data table with sorting/pagination
│   ├── EditArticleModal.tsx # Article editing modal
│   └── PerformanceChart.tsx # Analytics visualization
├── context/             # React Context providers
│   └── DashboardContext.tsx # Global state management
├── data/               # Mock data and API simulation
│   └── mockData.ts     # Sample articles and users
├── types/              # TypeScript type definitions
│   └── index.ts        # Shared interfaces and types
├── utils/              # Utility functions
│   └── index.ts        # Helper functions for filtering, sorting
├── App.tsx             # Root application component
├── main.tsx           # Application entry point
└── index.css          # Global styles and Tailwind imports
```

## 🎯 Key Components

### Dashboard Context
Centralized state management using React Context and useReducer:
- User authentication state
- Article data and filtering
- Performance metrics
- UI state (pagination, sorting)

### Articles Table
Advanced data table with:
- Column sorting with visual indicators
- Real-time search and filtering
- Responsive pagination
- Mobile-optimized card layout
- Inline editing capabilities

### Performance Chart
Interactive analytics dashboard:
- Switchable chart types (Line/Bar)
- Time period selection (Daily/Monthly)
- Real-time data aggregation
- Responsive design with proper scaling

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

## 🎨 Customization

### Theming
The application uses Tailwind CSS for styling. You can customize:
- Colors in `tailwind.config.js`
- Typography and spacing
- Component variants
- Dark mode support (easily extendable)

### Data Source
Currently uses mock data from `src/data/mockData.ts`. To integrate with a real API:
1. Replace mock data calls in `DashboardContext.tsx`
2. Add API service functions
3. Update type definitions if needed
4. Handle loading and error states

### Adding New Features
The modular architecture makes it easy to add new features:
1. Create new components in `src/components/`
2. Add types to `src/types/index.ts`
3. Update context if global state is needed
4. Add utility functions to `src/utils/`

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on push

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - The web framework used
- [Tailwind CSS](https://tailwindcss.com/) - For the amazing utility-first CSS framework
- [Lucide](https://lucide.dev/) - For the beautiful icon set
- [Recharts](https://recharts.org/) - For the powerful charting library
- [Pexels](https://pexels.com/) - For the stock photography

## 📞 Support

If you have any questions or need help with setup, please:
1. Check the existing issues on GitHub
2. Create a new issue with detailed information
3. Include screenshots if reporting UI issues
4. Provide steps to reproduce any bugs

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**