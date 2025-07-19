# LeetCode Clone

A full-featured LeetCode clone built with React, Vite, and modern web technologies. This application provides a complete coding interview practice platform with an integrated code editor, test runner, and problem management system.

## 🚀 Features

### Core Functionality
- **Problem Dashboard**: View statistics, progress tracking, and featured problems
- **Problem Browser**: Filter and search through coding problems by difficulty, category, and keywords
- **Interactive Code Editor**: Monaco Editor with syntax highlighting for JavaScript, Python, and Java
- **Test Runner**: Execute code against test cases with visual feedback
- **Responsive Design**: Optimized for desktop and mobile devices

### Problem Management
- **5 Sample Problems**: Including classic problems like Two Sum, Add Two Numbers, etc.
- **Difficulty Levels**: Easy, Medium, and Hard problem categorization
- **Categories**: Array, String, Linked List, Stack, and more
- **Progress Tracking**: Visual indicators for solved problems
- **Acceptance Rates**: Display problem acceptance statistics

### User Interface
- **Modern Design**: Clean, professional UI inspired by LeetCode
- **Navigation**: Intuitive routing between dashboard, problem list, and individual problems
- **Code Editor**: Feature-rich editor with language selection and code reset functionality
- **Test Results**: Detailed test case results with pass/fail indicators

## 🛠️ Tech Stack

- **Frontend**: React 18 with Hooks
- **Build Tool**: Vite for fast development and building
- **Routing**: React Router DOM for navigation
- **Code Editor**: Monaco Editor (VS Code editor)
- **Icons**: Lucide React for consistent iconography
- **Styling**: Modern CSS with responsive design
- **HTTP Client**: Axios (ready for backend integration)

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd leetcode-clone
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**: Navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── Navbar.jsx       # Navigation bar
│   ├── Dashboard.jsx    # Main dashboard with stats
│   ├── ProblemList.jsx  # Problem browser and filtering
│   └── ProblemDetail.jsx # Individual problem with editor
├── data/
│   └── problems.js      # Sample problem data
├── utils/               # Utility functions (future use)
├── App.jsx             # Main app component with routing
├── App.css             # Main application styles
├── main.jsx            # Application entry point
└── index.css           # Global styles
```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 Key Components

### Dashboard (`/`)
- User statistics and progress tracking
- Difficulty breakdown with progress bars
- Featured problems showcase
- Quick action buttons

### Problem List (`/problems`)
- Comprehensive problem browser
- Search and filtering capabilities
- Sortable table with problem metadata
- Solved status indicators

### Problem Detail (`/problems/:id`)
- Split-pane layout with problem description and code editor
- Language selection (JavaScript, Python, Java)
- Interactive code execution with test cases
- Detailed test results with pass/fail status

## 🎨 Design Features

- **Responsive Layout**: Adapts to different screen sizes
- **Modern UI**: Clean design with consistent spacing and typography
- **Color Coding**: Difficulty-based color schemes (green/yellow/red)
- **Interactive Elements**: Hover effects and smooth transitions
- **Accessibility**: Proper contrast ratios and keyboard navigation

## 🔮 Future Enhancements

### Backend Integration
- User authentication and profiles
- Code submission and evaluation
- Real-time test execution
- Progress persistence

### Additional Features
- Discussion forums for each problem
- Editorial solutions and explanations
- Contest mode with time limits
- Code submission history
- Performance analytics

### Technical Improvements
- Dark mode support
- Code auto-save functionality
- Advanced code editor features (IntelliSense, debugging)
- WebSocket integration for real-time features

## 📝 Sample Problems

The application includes 5 carefully selected problems:

1. **Two Sum** (Easy) - Array manipulation
2. **Add Two Numbers** (Medium) - Linked List operations
3. **Longest Substring Without Repeating Characters** (Medium) - String processing
4. **Median of Two Sorted Arrays** (Hard) - Advanced algorithms
5. **Valid Parentheses** (Easy) - Stack implementation

Each problem includes:
- Detailed problem description
- Multiple examples with explanations
- Constraints and edge cases
- Starter code for all supported languages
- Comprehensive test cases

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by LeetCode's interface and functionality
- Built with modern React practices and tools
- Uses Monaco Editor for professional code editing experience
