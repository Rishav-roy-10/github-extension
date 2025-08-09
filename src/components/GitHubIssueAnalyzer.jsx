import React from "react";
import { useIssueAnalyzer } from "./js/useIssueAnalyzer.js";
import Header from "./Header.jsx";
import NavBar from "./NavBar.jsx";
import Footer from "./Footer.jsx";
import RepoInput from "./RepoInput.jsx";
import IssuesList from "./IssuesList.jsx";
import AISolutions from "./AISolutions.jsx";

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
    <div className="bg-gray-900 text-gray-200 flex flex-col w-full h-full min-w-0 overflow-hidden rounded-lg">
      {/* Scrollable main area */}
      <div className="flex-1 overflow-y-auto p-2 sm:p-4 min-w-0">
        <Header />

        {/* Repo Input */}
        <RepoInput
          repoUrl={repoUrl}
          setRepoUrl={setRepoUrl}
          analyzing={analyzing}
          error={error}
          onAnalyze={analyzeRepo}
        />

        {/* Issues & AI Solutions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 min-w-0">
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

        {/* How to Use */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 sm:p-4 mt-4">
          <h3 className="font-medium text-blue-300 mb-2">How to use:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-blue-200 text-xs sm:text-sm">
            <div>
              <h4 className="font-medium mb-1">Left Panel (GitHub Issues):</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Shows repository issues with file references</li>
                <li>Displays folder structure and code locations</li>
                <li>Click any issue to select it for AI analysis</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-1">Right Panel (AI Solutions):</h4>
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
