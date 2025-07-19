import { Link } from 'react-router-dom';
import { TrendingUp, CheckCircle, Clock, Target } from 'lucide-react';
import { problems } from '../data/problems';

const Dashboard = () => {
  const stats = {
    totalProblems: problems.length,
    easySolved: 2,
    mediumSolved: 1,
    hardSolved: 0,
    totalSolved: 3
  };

  const recentProblems = problems.slice(0, 3);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-600';
      case 'Medium':
        return 'text-yellow-600';
      case 'Hard':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome to LeetCode Clone</h1>
        <p>Practice coding problems and improve your programming skills</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Target size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.totalProblems}</h3>
            <p>Total Problems</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <CheckCircle size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.totalSolved}</h3>
            <p>Problems Solved</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <h3>{Math.round((stats.totalSolved / stats.totalProblems) * 100)}%</h3>
            <p>Success Rate</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <h3>7</h3>
            <p>Day Streak</p>
          </div>
        </div>
      </div>

      <div className="difficulty-breakdown">
        <h2>Problems by Difficulty</h2>
        <div className="difficulty-stats">
          <div className="difficulty-item">
            <span className="difficulty-label easy">Easy</span>
            <span className="difficulty-count">{stats.easySolved} / {problems.filter(p => p.difficulty === 'Easy').length}</span>
            <div className="difficulty-bar">
              <div 
                className="difficulty-progress easy" 
                style={{ width: `${(stats.easySolved / problems.filter(p => p.difficulty === 'Easy').length) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="difficulty-item">
            <span className="difficulty-label medium">Medium</span>
            <span className="difficulty-count">{stats.mediumSolved} / {problems.filter(p => p.difficulty === 'Medium').length}</span>
            <div className="difficulty-bar">
              <div 
                className="difficulty-progress medium" 
                style={{ width: `${(stats.mediumSolved / problems.filter(p => p.difficulty === 'Medium').length) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="difficulty-item">
            <span className="difficulty-label hard">Hard</span>
            <span className="difficulty-count">{stats.hardSolved} / {problems.filter(p => p.difficulty === 'Hard').length}</span>
            <div className="difficulty-bar">
              <div 
                className="difficulty-progress hard" 
                style={{ width: `${(stats.hardSolved / problems.filter(p => p.difficulty === 'Hard').length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="recent-problems">
        <div className="section-header">
          <h2>Featured Problems</h2>
          <Link to="/problems" className="view-all-link">View All Problems</Link>
        </div>
        <div className="problems-grid">
          {recentProblems.map((problem) => (
            <Link key={problem.id} to={`/problems/${problem.id}`} className="problem-card">
              <div className="problem-header">
                <h3>{problem.title}</h3>
                <span className={`difficulty-badge ${problem.difficulty.toLowerCase()}`}>
                  {problem.difficulty}
                </span>
              </div>
              <p className="problem-category">{problem.category}</p>
              <p className="problem-description">
                {problem.description.substring(0, 100)}...
              </p>
              <div className="problem-stats">
                <span className="acceptance-rate">Acceptance: {problem.acceptance}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Start</h2>
        <div className="action-buttons">
          <Link to="/problems" className="action-btn primary">
            <Target size={20} />
            Browse Problems
          </Link>
          <Link to="/problems/1" className="action-btn secondary">
            <TrendingUp size={20} />
            Start with Two Sum
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;