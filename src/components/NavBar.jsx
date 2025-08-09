const NavBar = () => (
  <nav className="bg-gray-800 border-b border-gray-700 w-full">
    <div className="px-3 py-2 flex items-center justify-between">
      <div className="flex items-center gap-2 min-w-0">
        <img src="/Analyzer.png" alt="Logo" className="w-8 h-8 rounded" />
        <span className="text-white font-semibold text-base truncate">
          Issue Analyzer
        </span>
      </div>
    </div>
  </nav>
);

export default NavBar;
