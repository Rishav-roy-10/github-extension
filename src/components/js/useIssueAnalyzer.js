import { useState } from 'react';

export function useIssueAnalyzer() {
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

  return {
    repoUrl,
    setRepoUrl,
    issues,
    selectedIssue,
    analyzing,
    error,
    aiSolution,
    loadingAI,
    analyzeRepo,
    getAISolution,
    handleIssueSelect,
  };
}


