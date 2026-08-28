import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function WelcomePage() {
  const [userName, setUserName] = useState('');
  const [destination, setDestination] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (!storedName) {
      navigate('/');
    } else {
      setUserName(storedName);
    }
  }, [navigate]);

    const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (destination.trim()) {
      navigate(`/itinerary?destination=${destination}`);
    }
  };

  return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 px-4 relative">

      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 flex items-center gap-1.5 text-sm text-gray-500 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm hover:bg-white hover:text-red-500 hover:shadow-md transition-all duration-150"
      >
        Log out
        <span className="text-base">↗</span>
      </button>
      
      <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">
        Hey {userName}, where would you like to go?
      </h1>

          <p className="text-gray-500 mb-8 text-center">
        Search a destination and let's plan your trip
      </p>

      <form onSubmit={handleSearch} className="w-full max-w-md">
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Try Goa, Manali, Jaipur..."
          className="w-full border border-gray-300 rounded-full px-6 py-4 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 text-white py-3 rounded-full font-medium hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all duration-150"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default WelcomePage;