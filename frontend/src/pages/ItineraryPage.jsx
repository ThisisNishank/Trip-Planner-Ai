import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import api from '../api/axios';
import ReactMarkdown from 'react-markdown';
import { getImageSearchTerm } from '../utils/destinationImageQueries';



function ItineraryPage() {
  const [searchParams] = useSearchParams();
  const destinationName = searchParams.get('destination');
  const navigate = useNavigate();

  const [destination, setDestination] = useState(null);
  const [weather, setWeather] = useState(null);
  const [heroImage, setHeroImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const [showPlanner, setShowPlanner] = useState(false);
  const [days, setDays] = useState('');
  const [people, setPeople] = useState('');
  const [budget, setBudget] = useState('');
  const [aiItinerary, setAiItinerary] = useState('');
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
      const fetchData = async () => {
      try {
        const destRes = await api.get(`/destinations/${destinationName}`);
        setDestination(destRes.data);
      } catch (error) {
        setErrorMessage('Destination not found. Try Goa, Manali, Jaipur, or another famous place.');
        setLoading(false);
        return;
      }

      try {
        const weatherRes = await api.get(`/destinations/${destinationName}/weather`);
        setWeather(weatherRes.data);
      } catch {
        // weather temporarily unavailable — page still works fine without it
      }

      try {
        const searchTerm = getImageSearchTerm(destinationName);
        const wikiRes = await axios.get(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${searchTerm}`
        );
        if (wikiRes.data.originalimage) {
          setHeroImage(wikiRes.data.originalimage.source);
        } else if (wikiRes.data.thumbnail) {
          setHeroImage(wikiRes.data.thumbnail.source);
        }
      } catch {
        // no image found — that's fine, page still works without one
      }

      setLoading(false);
    };
    fetchData();
  }, [destinationName]);

  const handleGenerateItinerary = async (e) => {
    e.preventDefault();
    setGenerating(true);
    setAiItinerary('');

    const token = localStorage.getItem('token');

    try {
      const response = await api.post(
        '/itinerary',
        { destinationName, days, people, budget },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAiItinerary(response.data.itinerary);
    } catch (error) {
      setAiItinerary('Something went wrong generating your itinerary. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading destination...</p>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <p className="text-red-500 text-lg mb-4">{errorMessage}</p>
               <button
          onClick={() => navigate('/')}
          className="text-blue-600 hover:underline"
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-10 relative">
            {heroImage && (
        <div className="relative w-full h-72 sm:h-96 overflow-hidden">
          <img
            src={heroImage}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-0 right-0 max-w-3xl mx-auto px-4">
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
              {destination.name}
            </h1>
            <p className="text-white/95 text-lg font-medium drop-shadow mt-1">{destination.state}</p>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 pt-10">
        {!heroImage && (
          <>
            <h1 className="text-4xl font-bold text-gray-800 mb-1">{destination.name}</h1>
            <p className="text-gray-500 mb-6">{destination.state}</p>
          </>
        )}

        <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-r-xl p-5 mb-8 mt-6">
          <p className="text-gray-700 leading-relaxed italic">"{destination.description}"</p>
        </div>

        {weather && (
          <div className="bg-white rounded-xl shadow-sm p-5 mb-8 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Current Weather</p>
              <p className="text-xl font-semibold text-gray-800">
                {weather.temperature} · {weather.condition}
              </p>
            </div>
            <p className="text-sm text-gray-400">Humidity {weather.humidity}</p>
          </div>
        )}

        <h2 className="text-xl font-semibold text-gray-800 mb-3">Top Attractions</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {destination.attractions.map((attraction) => (
            <Link
              key={attraction.name}
              to={`/attraction?destination=${encodeURIComponent(destination.name)}&name=${encodeURIComponent(attraction.name)}`}
              className="group bg-white p-4 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 block"
            >
              <p className="font-medium text-gray-800 group-hover:text-blue-600 transition">
                {attraction.name}
              </p>
              <p className="text-sm text-gray-500 mb-2">{attraction.description}</p>
              <span className="text-xs text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Explore this place →
              </span>
            </Link>
          ))}
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mb-3">Where to Stay</h2>
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {destination.hotels.map((hotel) => (
            <div
              key={hotel.name}
              className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-150"
            >
              <p className="font-medium text-gray-800">{hotel.name}</p>
              <p className="text-sm text-gray-500">{hotel.priceRange}</p>
              <p className="text-sm text-gray-400">₹{hotel.pricePerNight}/night</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 grid sm:grid-cols-2 gap-4 text-sm text-gray-600 mb-8">
          <p><span className="font-medium text-gray-800">Nearest Airport:</span> {destination.nearestAirport}</p>
          <p><span className="font-medium text-gray-800">Nearest Railway Station:</span> {destination.nearestRailwayStation}</p>
          <p className="sm:col-span-2"><span className="font-medium text-gray-800">Best Time to Visit:</span> {destination.bestTimeToVisit}</p>
        </div>
      </div>

      {/* Floating AI button */}
            <button
        onClick={() => {
          const token = localStorage.getItem('token');
          if (!token) {
            navigate('/login');
          } else {
            setShowPlanner(true);
          }
        }}
        className="fixed bottom-6 right-6 bg-blue-600 text-white px-5 py-4 rounded-full shadow-lg hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all duration-150"
      >
        ✨ Plan with AI
      </button>

      {/* AI planner panel */}
            {showPlanner && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl max-h-[88vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">✨ Your AI Trip Plan</h2>
              
              <button
                onClick={() => setShowPlanner(false)}
                className="text-gray-400 hover:text-gray-700 transition"
              >
                ✕
              </button>
            </div>

            {!aiItinerary && (
              <form onSubmit={handleGenerateItinerary}>
                <label className="block text-sm text-gray-600 mb-1">Number of days</label>
                <input
                  type="number"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  required
                  min="1"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />

                <label className="block text-sm text-gray-600 mb-1">Number of people</label>
                <input
                  type="number"
                  value={people}
                  onChange={(e) => setPeople(e.target.value)}
                  required
                  min="1"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />

                <label className="block text-sm text-gray-600 mb-1">Total budget (₹)</label>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  required
                  min="1"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-5 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />

                <button
                  type="submit"
                  disabled={generating}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {generating ? 'Generating your plan...' : 'Generate Itinerary'}
                </button>
              </form>
            )}

              {aiItinerary && (
              <div className="prose prose-sm sm:prose-base prose-headings:text-blue-700 prose-strong:text-gray-800 max-w-none">
                <ReactMarkdown>{aiItinerary}</ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ItineraryPage;