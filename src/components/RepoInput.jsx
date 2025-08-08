export const RepoInput = ({ repoUrl, setRepoUrl, analyzing, error, onAnalyze }) => (
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
        onClick={onAnalyze}
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
);


