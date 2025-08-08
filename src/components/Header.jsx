export const Header = () => (
  <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6 border border-gray-700">
    <div className="flex items-center gap-4">
      <img
        src="/Analyzer.png"
        alt="App Logo"
        className="w-10 h-10 rounded"
      />
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">GitHub Issue Analyzer</h1>
        <p className="text-gray-400">
          Fetch GitHub issues with file details and get <span className="text-purple-400">AI-powered solutions</span>
        </p>
      </div>
    </div>
  </div>
);


