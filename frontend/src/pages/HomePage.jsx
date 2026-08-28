import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../api/axios';
import { getImageSearchTerm } from '../utils/destinationImageQueries';
import { useTheme } from '../hooks/useTheme';
import Footer from '../components/Footer';






function HomePage() {
  const [destinations, setDestinations] = useState([]);
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    setUserName(localStorage.getItem('userName') || '');

    const fetchDestinations = async () => {
      try {
        const res = await api.get('/destinations');
        setDestinations(res.data);

                res.data.forEach(async (dest) => {
          try {
            const searchTerm = getImageSearchTerm(dest.name);
            const wikiRes = await axios.get(
              `https://en.wikipedia.org/api/rest_v1/page/summary/${searchTerm}`
            );

            const url = wikiRes.data.originalimage?.source || wikiRes.data.thumbnail?.source;
            if (url) {
              setImages((prev) => ({ ...prev, [dest.name]: url }));
            }
          } catch {
            // no image found for this one, card just shows a plain gradient
          }
        });
      } catch (error) {
        console.error('Failed to load destinations', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUserName('');
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      navigate(`/itinerary?destination=${searchText.trim()}`);
    }
  };

    const handleAiClick = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else if (searchText.trim()) {
      navigate(`/itinerary?destination=${searchText.trim()}`);
    } else {
      alert('Please search or pick a destination first!');
    }
  };

  return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <nav className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-30 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <span className="text-xl font-bold text-gray-800 dark:text-white whitespace-nowrap">
            ✈️ AI Travel Planner
          </span>

          <form onSubmit={handleSearch} className="flex-1 max-w-md">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search a destination..."
              className="w-full border border-gray-300 rounded-full px-5 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </form>

          <div className="flex items-center gap-3 whitespace-nowrap">
            <button
              onClick={handleAiClick}
              className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-4 py-2.5 rounded-full font-medium text-sm hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-150"
            >
              ✨ Plan with AI
            </button>


           <button
              onClick={toggleTheme}
              className="text-xl w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 hover:scale-110 active:scale-95 transition-all duration-150"
              aria-label="Toggle theme"
            >
            {isDark ? '☀' : '☽'}
            </button>


            {userName ? (
              <button
                onClick={handleLogout}
                className="text-sm text-gray-500 bg-gray-100 px-4 py-2.5 rounded-full hover:bg-gray-200 hover:text-red-500 transition"
              >
                Log out
              </button>
            ) : (
              <Link
                to="/login"
                className="text-sm text-gray-600 border border-gray-300 px-4 py-2.5 rounded-full hover:bg-gray-100 transition"
              >
                Log in / Sign up
              </Link>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 pt-10 pb-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white transition-colors duration-300">
          {userName ? `Hey ${userName}, where to next?` : 'Explore famous places across India'}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Pick a destination below, or search for one above.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-16">
        {loading ? (
          <p className="text-gray-400">Loading destinations...</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((dest) => (
              <Link
                key={dest._id}
                to={`/itinerary?destination=${dest.name}`}
                className="group relative rounded-2xl overflow-hidden h-56 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
              >
                {images[dest.name] ? (
                  <img
                    src={images[dest.name]}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-200 to-indigo-300" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-xl font-bold drop-shadow">{dest.name}</p>
                  <p className="text-white/80 text-sm">{dest.state}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;