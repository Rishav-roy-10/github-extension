import React, { useEffect } from "react";

const RepoInput = ({ repoUrl, setRepoUrl, analyzing, error, onAnalyze }) => {
  useEffect(() => {
    if (typeof chrome !== "undefined" && chrome.runtime) {
      chrome.runtime.sendMessage({ action: "GET_ACTIVE_TAB_URL" }, (response) => {
        if (response && response.url && response.url.includes("github.com")) {
          const pathParts = new URL(response.url).pathname.split("/").filter(Boolean);
          if (pathParts.length >= 2) {
            const detectedUrl = `https://github.com/${pathParts[0]}/${pathParts[1]}`;
            setRepoUrl(detectedUrl);
          }
        }
      });
    }
  }, [setRepoUrl]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") onAnalyze();
  };

  // Auto-detect when a valid GitHub repo link is entered
  useEffect(() => {
    const githubRepoPattern = /^https:\/\/github\.com\/[^\/]+\/[^\/]+$/i;
    if (githubRepoPattern.test(repoUrl.trim())) {
      const timer = setTimeout(() => {
        onAnalyze();
      }, 800); // small delay so user can finish typing
      return () => clearTimeout(timer);
    }
  }, [repoUrl, onAnalyze]);

  return (
    <div className="bg-gray-800 rounded-lg shadow p-3 mb-3 border border-gray-700 w-full min-w-0">
      <div className="flex flex-col sm:flex-row gap-2 sm:items-end">
        <div className="flex-1 min-w-0">
          <label className="block text-xs font-medium text-gray-300 mb-1">
            GitHub Repository URL
          </label>
          <input
            type="url"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="https://github.com/owner/repository"
            className="w-full px-3 py-1.5 border border-gray-600 rounded-md bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        <button
          onClick={onAnalyze}
          disabled={analyzing || !repoUrl.trim()}
          className="bg-blue-600 text-white px-3 py-1.5 rounded-md shadow hover:bg-blue-500 transition disabled:bg-gray-500 w-full sm:w-auto text-sm"
        >
          {analyzing ? "Fetching..." : "Fetch Issues"}
        </button>
      </div>

      {error && (
        <div className="mt-2 bg-red-900 border border-red-700 rounded-md p-2 text-sm text-red-200">
          {error}
        </div>
      )}
    </div>
  );
};

export default RepoInput;
