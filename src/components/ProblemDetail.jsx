import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { Play, RotateCcw, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import { problems } from '../data/problems';

const ProblemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const problem = problems.find(p => p.id === parseInt(id));
  
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [testResults, setTestResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (problem) {
      setCode(problem.starterCode[selectedLanguage] || '');
    }
  }, [problem, selectedLanguage]);

  if (!problem) {
    return (
      <div className="problem-not-found">
        <h2>Problem not found</h2>
        <button onClick={() => navigate('/problems')} className="btn btn-primary">
          Back to Problems
        </button>
      </div>
    );
  }

  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' }
  ];

  const runCode = async () => {
    setIsRunning(true);
    setShowResults(false);
    
    // Simulate test execution
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock test results (in a real app, this would send code to a backend)
    const mockResults = problem.testCases.map((testCase, index) => ({
      passed: Math.random() > 0.3, // 70% chance of passing
      input: testCase.input,
      expected: testCase.expected,
      actual: index === 0 ? testCase.expected : 'undefined', // First test always passes in mock
      testCase: index + 1
    }));

    setTestResults(mockResults);
    setIsRunning(false);
    setShowResults(true);
  };

  const resetCode = () => {
    setCode(problem.starterCode[selectedLanguage] || '');
    setTestResults([]);
    setShowResults(false);
  };

  const submitCode = () => {
    // In a real app, this would submit to backend for full test suite
    alert('Code submitted successfully! (Mock submission)');
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return '#00b04f';
      case 'Medium':
        return '#ffb800';
      case 'Hard':
        return '#ff375f';
      default:
        return '#666';
    }
  };

  return (
    <div className="problem-detail">
      <div className="problem-header">
        <button onClick={() => navigate('/problems')} className="back-btn">
          <ArrowLeft size={18} />
          Back to Problems
        </button>
        <div className="problem-title-section">
          <h1>{problem.id}. {problem.title}</h1>
          <div className="problem-meta">
            <span 
              className="difficulty-badge"
              style={{ backgroundColor: getDifficultyColor(problem.difficulty) }}
            >
              {problem.difficulty}
            </span>
            <span className="category-badge">{problem.category}</span>
            <span className="acceptance-rate">Acceptance: {problem.acceptance}</span>
          </div>
        </div>
      </div>

      <div className="problem-content">
        <div className="problem-description">
          <div className="description-section">
            <h3>Description</h3>
            <div className="description-text">
              {problem.description.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="examples-section">
            <h3>Examples</h3>
            {problem.examples.map((example, index) => (
              <div key={index} className="example">
                <h4>Example {index + 1}:</h4>
                <div className="example-content">
                  <div className="example-input">
                    <strong>Input:</strong> <code>{example.input}</code>
                  </div>
                  <div className="example-output">
                    <strong>Output:</strong> <code>{example.output}</code>
                  </div>
                  {example.explanation && (
                    <div className="example-explanation">
                      <strong>Explanation:</strong> {example.explanation}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="constraints-section">
            <h3>Constraints</h3>
            <ul>
              {problem.constraints.map((constraint, index) => (
                <li key={index}>{constraint}</li>
              ))}
            </ul>
          </div>

          {showResults && (
            <div className="test-results-section">
              <h3>Test Results</h3>
              <div className="test-results">
                {testResults.map((result, index) => (
                  <div key={index} className={`test-result ${result.passed ? 'passed' : 'failed'}`}>
                    <div className="test-header">
                      {result.passed ? (
                        <CheckCircle size={16} className="test-icon success" />
                      ) : (
                        <XCircle size={16} className="test-icon error" />
                      )}
                      <span>Test Case {result.testCase}</span>
                    </div>
                    <div className="test-details">
                      <div><strong>Input:</strong> {JSON.stringify(result.input)}</div>
                      <div><strong>Expected:</strong> {JSON.stringify(result.expected)}</div>
                      {!result.passed && (
                        <div><strong>Actual:</strong> {JSON.stringify(result.actual)}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="code-editor-section">
          <div className="editor-header">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="language-selector"
            >
              {languages.map(lang => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
            
            <div className="editor-actions">
              <button onClick={resetCode} className="btn btn-secondary" disabled={isRunning}>
                <RotateCcw size={16} />
                Reset
              </button>
            </div>
          </div>

          <div className="editor-container">
            <Editor
              height="400px"
              language={selectedLanguage}
              value={code}
              onChange={(value) => setCode(value || '')}
              theme="vs-dark"
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                automaticLayout: true,
              }}
            />
          </div>

          <div className="editor-footer">
            <div className="run-section">
              <button 
                onClick={runCode} 
                className="btn btn-primary run-btn"
                disabled={isRunning}
              >
                {isRunning ? (
                  <>
                    <div className="spinner"></div>
                    Running...
                  </>
                ) : (
                  <>
                    <Play size={16} />
                    Run Code
                  </>
                )}
              </button>
              
              <button 
                onClick={submitCode} 
                className="btn btn-success submit-btn"
                disabled={isRunning}
              >
                Submit
              </button>
            </div>

            {showResults && (
              <div className="results-summary">
                <span className="passed-count">
                  {testResults.filter(r => r.passed).length} / {testResults.length} test cases passed
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;