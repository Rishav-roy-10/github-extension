export const Footer = () => (
  <footer className="mt-10 bg-gray-900 border-t border-gray-800">
    <div className="max-w-7xl mx-auto px-4 py-6 text-sm text-gray-400 flex flex-col md:flex-row items-center justify-between gap-3">
      <div>© {new Date().getFullYear()} Issue Analyzer. All rights reserved.</div>
      <div className="flex items-center gap-4">
        <a href="#" className="hover:text-gray-200">Privacy</a>
        <a href="#" className="hover:text-gray-200">Terms</a>
        <a href="#" className="hover:text-gray-200">Contact</a>
      </div>
    </div>
  </footer>
);


