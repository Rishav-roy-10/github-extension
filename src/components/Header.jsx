const Header = () => (
  <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg shadow-lg p-3 mb-3 border border-gray-700 w-full min-w-0">
    <div className="flex items-center gap-3 flex-wrap">
      <img
        src="/Analyzer.png"
        alt="App Logo"
        className="w-10 h-10 rounded transition-transform duration-200"
      />
      <div className="flex-1 min-w-0">
        <h1 className="text-lg sm:text-xl font-bold text-white leading-tight truncate">
          GitHub Issue Analyzer
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 truncate">
          Fetch issues & get <span className="text-purple-400">AI solutions</span>
        </p>
      </div>
    </div>
  </div>
);

export default Header;
