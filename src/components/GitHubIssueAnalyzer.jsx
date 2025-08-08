import React from 'react';
import { useIssueAnalyzer } from './useIssueAnalyzer.js';
import { Header } from './Header.jsx';
import { NavBar } from './NavBar.jsx';
import { Footer } from './Footer.jsx';
import { RepoInput } from './RepoInput.jsx';
import { IssuesList } from './IssuesList.jsx';
import { AISolutions } from './AISolutions.jsx';

const GitHubIssueAnalyzer = () => {
  const {
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
  } = useIssueAnalyzer();

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <NavBar />
      <div id="home" className="max-w-7xl mx-auto p-6 scroll-mt-20">
        <Header />

        <RepoInput
          repoUrl={repoUrl}
          setRepoUrl={setRepoUrl}
          analyzing={analyzing}
          error={error}
          onAnalyze={analyzeRepo}
        />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <IssuesList
            issues={issues}
            analyzing={analyzing}
            selectedIssue={selectedIssue}
            onSelect={handleIssueSelect}
            onGetAI={getAISolution}
            loadingAI={loadingAI}
          />

          <AISolutions
            selectedIssue={selectedIssue}
            aiSolution={aiSolution}
            loadingAI={loadingAI}
            onGetAI={getAISolution}
          />
        </div>

        <div id="docs" className="bg-gray-800 border border-gray-700 rounded-lg p-6 mt-6 scroll-mt-20">
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

        <div id="about" className="bg-gray-800 border border-gray-700 rounded-lg p-6 mt-6 scroll-mt-20">
          <h3 className="font-medium text-white mb-2">About</h3>
          <p className="text-gray-300 text-sm leading-6">
            Issue Analyzer helps you fetch GitHub issues, view referenced files and line ranges, and generate
            AI-powered solution suggestions to speed up debugging and implementation. It is built with React and Vite,
            styled with Tailwind, and connects to a local API for analysis.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GitHubIssueAnalyzer;


