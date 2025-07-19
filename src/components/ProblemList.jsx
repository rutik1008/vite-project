import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, CheckCircle } from 'lucide-react';
import { problems } from '../data/problems';

const ProblemList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortBy, setSortBy] = useState('id');

  // Get unique categories
  const categories = ['All', ...new Set(problems.map(p => p.category))];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  // Mock solved problems (in a real app, this would come from user data)
  const solvedProblems = new Set([1, 5]); // User has solved problems 1 and 5

  const filteredAndSortedProblems = useMemo(() => {
    let filtered = problems.filter(problem => {
      const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           problem.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDifficulty = difficultyFilter === 'All' || problem.difficulty === difficultyFilter;
      const matchesCategory = categoryFilter === 'All' || problem.category === categoryFilter;
      
      return matchesSearch && matchesDifficulty && matchesCategory;
    });

    // Sort problems
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'difficulty':
          const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        case 'acceptance':
          return parseFloat(b.acceptance) - parseFloat(a.acceptance);
        case 'id':
        default:
          return a.id - b.id;
      }
    });

    return filtered;
  }, [searchTerm, difficultyFilter, categoryFilter, sortBy]);

  const getDifficultyClass = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'difficulty-easy';
      case 'Medium':
        return 'difficulty-medium';
      case 'Hard':
        return 'difficulty-hard';
      default:
        return '';
    }
  };

  const getStats = () => {
    const total = problems.length;
    const solved = solvedProblems.size;
    const easy = problems.filter(p => p.difficulty === 'Easy').length;
    const medium = problems.filter(p => p.difficulty === 'Medium').length;
    const hard = problems.filter(p => p.difficulty === 'Hard').length;
    
    return { total, solved, easy, medium, hard };
  };

  const stats = getStats();

  return (
    <div className="problem-list">
      <div className="problem-list-header">
        <div className="header-content">
          <h1>Problems</h1>
          <div className="problem-stats">
            <div className="stat-item">
              <span className="stat-number">{stats.solved}</span>
              <span className="stat-label">Solved</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{stats.total}</span>
              <span className="stat-label">Total</span>
            </div>
          </div>
        </div>
        
        <div className="difficulty-overview">
          <div className="difficulty-stat">
            <span className="difficulty-label easy">Easy</span>
            <span>{problems.filter(p => p.difficulty === 'Easy' && solvedProblems.has(p.id)).length} / {stats.easy}</span>
          </div>
          <div className="difficulty-stat">
            <span className="difficulty-label medium">Medium</span>
            <span>{problems.filter(p => p.difficulty === 'Medium' && solvedProblems.has(p.id)).length} / {stats.medium}</span>
          </div>
          <div className="difficulty-stat">
            <span className="difficulty-label hard">Hard</span>
            <span>{problems.filter(p => p.difficulty === 'Hard' && solvedProblems.has(p.id)).length} / {stats.hard}</span>
          </div>
        </div>
      </div>

      <div className="filters">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search problems..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-controls">
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="filter-select"
          >
            {difficulties.map(difficulty => (
              <option key={difficulty} value={difficulty}>{difficulty}</option>
            ))}
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="filter-select"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="id">Sort by ID</option>
            <option value="title">Sort by Title</option>
            <option value="difficulty">Sort by Difficulty</option>
            <option value="acceptance">Sort by Acceptance</option>
          </select>
        </div>
      </div>

      <div className="problems-table-container">
        <table className="problems-table">
          <thead>
            <tr>
              <th className="status-col">Status</th>
              <th className="title-col">Title</th>
              <th className="difficulty-col">Difficulty</th>
              <th className="category-col">Category</th>
              <th className="acceptance-col">Acceptance</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedProblems.map((problem) => (
              <tr key={problem.id} className="problem-row">
                <td className="status-col">
                  {solvedProblems.has(problem.id) && (
                    <CheckCircle size={16} className="solved-icon" />
                  )}
                </td>
                <td className="title-col">
                  <Link to={`/problems/${problem.id}`} className="problem-title-link">
                    {problem.id}. {problem.title}
                  </Link>
                </td>
                <td className="difficulty-col">
                  <span className={`difficulty-badge ${getDifficultyClass(problem.difficulty)}`}>
                    {problem.difficulty}
                  </span>
                </td>
                <td className="category-col">{problem.category}</td>
                <td className="acceptance-col">{problem.acceptance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredAndSortedProblems.length === 0 && (
        <div className="no-results">
          <p>No problems found matching your criteria.</p>
          <button 
            onClick={() => {
              setSearchTerm('');
              setDifficultyFilter('All');
              setCategoryFilter('All');
            }}
            className="clear-filters-btn"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ProblemList;