import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 mt-10 py-8 text-center text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
      <div className="flex justify-center gap-6 mb-3">
        <Link to="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
          About Us
        </Link>
        <Link to="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
          Contact Us
        </Link>
      </div>
      <p>© 2026 AI Travel Planner. Built with React, Express & MongoDB.</p>
    </footer>
  );
}

export default Footer;