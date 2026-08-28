import { Link } from 'react-router-dom';

function AboutPage() {
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
          About AI Travel Planner
        </h1>

        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
          AI Travel Planner helps you explore famous destinations across India and instantly
          generates a personalized itinerary based on your budget, group size, and trip
          duration.
        </p>

        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
          We combine real destination data, live weather, and AI-powered planning into one
          simple experience — so you spend less time researching and more time actually
          planning your trip.
        </p>

        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          Built with React, Express, MongoDB, and Google's Gemini AI.
        </p>
      </div>
    </div>
  );
}

export default AboutPage;