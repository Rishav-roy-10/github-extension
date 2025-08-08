import React, { useState } from 'react';

const GitHubIssueAnalyzer = () => {
  const [repoUrl, setRepoUrl] = useState('');
  const [issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [aiSolution, setAiSolution] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);

  const analyzeRepo = async () => {
    if (!repoUrl.trim()) {
      setError('Please enter a GitHub repository URL');
      return;
    }

    setAnalyzing(true);
    setError('');
    setIssues([]);
    setSelectedIssue(null);
    setAiSolution(null);

    try {
      const response = await fetch('http://localhost:3001/api/issues/analyze-repo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repoUrl: repoUrl.trim() }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Analysis failed');

      setIssues(data.issues);
    } catch (err) {
      setError(err.message);
    } finally {
      setAnalyzing(false);
    }
  };

  const getAISolution = async (issue) => {
    setLoadingAI(true);
    setAiSolution(null);
    try {
      const response = await fetch(`http://localhost:3001/api/issues/${issue.repoOwner}/${issue.repoName}/${issue.issueId}/refresh-ai`, { method: 'POST' });
      if (!response.ok) throw new Error('Failed to get AI solution');
      const updatedIssue = await response.json();
      setAiSolution(updatedIssue.geminiSuggestion);
    } catch (err) {
      setError('Failed to get AI solution: ' + err.message);
    } finally {
      setLoadingAI(false);
    }
  };

  const handleIssueSelect = (issue) => {
    setSelectedIssue(issue);
    setAiSolution(issue.geminiSuggestion || null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  const getFileFolder = (filePath) => {
    const parts = filePath.split('/');
    return parts.slice(0, -1).join('/') || 'root';
  };

  const getFileName = (filePath) => filePath.split('/').pop();

  const getLineRange = (fileRef) => {
    if (fileRef.startLine && fileRef.endLine) return `Lines ${fileRef.startLine}-${fileRef.endLine}`;
    if (fileRef.line) return `Line ${fileRef.line}`;
    return 'Full file';
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6 border border-gray-700">
          <h1 className="text-3xl font-bold text-white mb-2">GitHub Issue Analyzer</h1>
          <p className="text-gray-400">Fetch GitHub issues with file details and get <span className="text-purple-400">AI-powered solutions</span></p>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6 border border-gray-700">
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">GitHub Repository URL</label>
              <input
                type="url"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="https://github.com/owner/repository"
                className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={analyzeRepo}
              disabled={analyzing || !repoUrl.trim()}
              className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-500 hover:shadow-lg transition disabled:bg-gray-500"
            >
              {analyzing ? 'Fetching...' : 'Fetch Issues'}
            </button>
          </div>

          {error && (
            <div className="mt-4 bg-red-900 border border-red-700 rounded-md p-3 text-red-200">{error}</div>
          )}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Issues Panel */}
          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700">
            <div className="bg-red-900 border-b border-red-700 p-4">
              <h2 className="text-lg font-bold text-red-200">GitHub Issues & Errors</h2>
              <p className="text-sm text-red-400 mt-1">Repository issues with file locations and code details</p>
            </div>

            <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
              {issues.length === 0 && !analyzing && (
                <div className="p-8 text-center text-gray-500">
                  <p>Enter a GitHub repository URL and click "Fetch Issues"</p>
                </div>
              )}

              {issues.map((issue) => (
                <div
                  key={issue._id}
                  onClick={() => handleIssueSelect(issue)}
                  className={`p-4 border-b border-gray-700 cursor-pointer hover:bg-gray-700 transition-colors ${
                    selectedIssue?._id === issue._id ? 'bg-red-900 border-l-4 border-l-red-500' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-100">#{issue.issueId} {issue.title}</h3>
                      <div className="text-sm text-gray-400 mt-1">
                        <span className="font-medium">{issue.repoOwner}/{issue.repoName}</span>
                        <span className="mx-2">•</span>
                        Updated: {formatDate(issue.lastUpdatedAt)}
                      </div>
                    </div>

                    <a
                      href={issue.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-400 hover:text-red-300 text-sm font-medium"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Open
                    </a>
                  </div>

                  {issue.fileRefs && issue.fileRefs.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                        Referenced Files ({issue.fileRefs.length})
                      </div>

                      {issue.fileRefs.map((fileRef, index) => (
                        <div key={index} className="bg-gray-700 rounded-md p-2 border-l-2 border-red-400">
                          <div className="mb-1">
                            <span className="text-xs text-gray-400 font-mono">{getFileFolder(fileRef.path)}</span>
                            <span className="text-xs text-gray-500">/</span>
                            <span className="text-xs font-medium text-blue-300 font-mono">{getFileName(fileRef.path)}</span>
                          </div>

                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs text-green-300 font-medium">{getLineRange(fileRef)}</span>
                            {fileRef.blobUrl && (
                              <a
                                href={fileRef.blobUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-blue-400 hover:text-blue-300"
                                onClick={(e) => e.stopPropagation()}
                              >
                                View Code
                              </a>
                            )}
                          </div>

                          {fileRef.snippet && (
                            <div className="bg-gray-900 rounded border border-gray-700 text-xs">
                              <pre className="p-2 overflow-x-auto text-gray-300">
                                <code>{fileRef.snippet}</code>
                              </pre>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {(!issue.fileRefs || issue.fileRefs.length === 0) && (
                    <div className="text-xs text-gray-500 italic">No file references detected in this issue</div>
                  )}

                  <div className="mt-3 pt-2 border-t border-gray-700">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleIssueSelect(issue);
                        getAISolution(issue);
                      }}
                      disabled={loadingAI}
                      className="w-full bg-purple-600 text-white px-3 py-1.5 rounded-md hover:bg-purple-500 disabled:bg-gray-600 text-xs transition"
                    >
                      {loadingAI && selectedIssue?._id === issue._id ? 'Getting AI Solution...' : 'Get AI Solution'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Solutions Panel — unchanged logic, just dark mode styles */}
          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700">
            <div className="bg-green-900 border-b border-green-700 p-4">
              <h2 className="text-lg font-bold text-green-200">AI-Powered Solutions</h2>
              <p className="text-sm text-green-400 mt-1">Gemini AI analysis and step-by-step solutions</p>
            </div>

            <div className="max-h-[600px] overflow-y-auto">
              {!selectedIssue ? (
                <div className="p-8 text-center text-gray-500">
                  <p className="text-lg font-medium mb-2">No Issue Selected</p>
                  <p>Select an issue from the left to see AI solutions</p>
                </div>
              ) : (
                <div className="p-4">
                  <div className="mb-4 pb-4 border-b border-gray-700">
                    <h3 className="font-bold text-gray-100 mb-2">Analyzing: #{selectedIssue.issueId} {selectedIssue.title}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => getAISolution(selectedIssue)}
                        disabled={loadingAI}
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500 disabled:bg-gray-600 text-sm transition"
                      >
                        {loadingAI ? 'Analyzing...' : (aiSolution ? 'Refresh AI Solution' : 'Get AI Solution')}
                      </button>

                      {aiSolution && (
                        <div className="text-xs text-green-400 self-center">✓ AI analysis available</div>
                      )}
                    </div>
                  </div>

                  {loadingAI ? (
                    <div className="text-center py-8">
                      <p className="text-gray-400">AI is analyzing the issue...</p>
                    </div>
                  ) : aiSolution ? (
                    <div className="space-y-4">
                      {aiSolution.problemAnalysis && (
                        <div className="border border-orange-700 rounded-lg p-4 bg-orange-900">
                          <h4 className="font-bold text-orange-300 mb-2">Problem Analysis</h4>
                          <div className="text-sm text-orange-200 whitespace-pre-wrap">{aiSolution.problemAnalysis}</div>
                        </div>
                      )}

                      {aiSolution.solutionSteps && (
                        <div className="border border-green-700 rounded-lg p-4 bg-green-900">
                          <h4 className="font-bold text-green-300 mb-2">Solution Steps</h4>
                          <div className="text-sm text-green-200 whitespace-pre-wrap">{aiSolution.solutionSteps}</div>
                        </div>
                      )}

                      {aiSolution.codeChanges && (
                        <div className="border border-blue-700 rounded-lg p-4 bg-blue-900">
                          <h4 className="font-bold text-blue-300 mb-2">Code Changes</h4>
                          <div className="bg-gray-900 rounded border border-gray-700 p-3">
                            <pre className="text-sm text-gray-200 whitespace-pre-wrap overflow-x-auto">{aiSolution.codeChanges}</pre>
                          </div>
                        </div>
                      )}

                      {aiSolution.bestPractices && (
                        <div className="border border-purple-700 rounded-lg p-4 bg-purple-900">
                          <h4 className="font-bold text-purple-300 mb-2">Best Practices</h4>
                          <div className="text-sm text-purple-200 whitespace-pre-wrap">{aiSolution.bestPractices}</div>
                        </div>
                      )}

                      {aiSolution.testingStrategy && (
                        <div className="border border-indigo-700 rounded-lg p-4 bg-indigo-900">
                          <h4 className="font-bold text-indigo-300 mb-2">Testing Strategy</h4>
                          <div className="text-sm text-indigo-200 whitespace-pre-wrap">{aiSolution.testingStrategy}</div>
                        </div>
                      )}

                      {aiSolution.rawResponse && !aiSolution.problemAnalysis && (
                        <div className="border border-gray-700 rounded-lg p-4 bg-gray-900">
                          <h4 className="font-bold text-gray-300 mb-2">AI Response</h4>
                          <div className="text-sm text-gray-200 whitespace-pre-wrap">{aiSolution.rawResponse}</div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>Click "Get AI Solution" to analyze this issue</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mt-6">
          <h3 className="font-medium text-blue-300 mb-2">How to use:</h3>
          <div className="grid md:grid-cols-2 gap-4 text-blue-200 text-sm">
            <div>
              <h4 className="font-medium mb-1">Left Form (GitHub Issues):</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Shows repository issues with file references</li>
                <li>Displays folder structure and code locations</li>
                <li>Click any issue to select it for AI analysis</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-1">Right Form (AI Solutions):</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Shows detailed AI analysis of selected issue</li>
                <li>Provides step-by-step solutions and code fixes</li>
                <li>Includes best practices and testing strategies</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitHubIssueAnalyzer;
