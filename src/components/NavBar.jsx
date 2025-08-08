export const NavBar = () => (
  <nav className="bg-gray-800 border-b border-gray-700">
    <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img src="/Analyzer.png" alt="Logo" className="w-8 h-8 rounded" />
        <span className="text-white font-semibold">Issue Analyzer</span>
      </div>
      <div className="flex items-center gap-4 text-sm">
        <a href="#home" className="text-gray-300 hover:text-white">Home</a>
        <a href="#docs" className="text-gray-300 hover:text-white">Docs</a>
        <a href="#about" className="text-gray-300 hover:text-white">About</a>
      </div>
    </div>
  </nav>
);


