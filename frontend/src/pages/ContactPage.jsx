import { Link } from 'react-router-dom';

function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <Link
          to="/"
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline mb-8 inline-block"
        >
          ← Back to home
        </Link>

        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
          Contact Us
        </h1>

        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
          Have questions, feedback, or found a bug? We'd love to hear from you.
        </p>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            📧 <span className="font-medium">Email:</span> support@aitravelplanner.com
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            📍 <span className="font-medium">Based in:</span> India
          </p>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;