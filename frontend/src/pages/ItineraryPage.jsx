import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import api from '../api/axios';
import ReactMarkdown from 'react-markdown';
import { getImageSearchTerm } from '../utils/destinationImageQueries';
import TripPlannerModal from '../components/TripPlannerModal';


function ItineraryPage() {
  const [searchParams] = useSearchParams();
  const destinationName = searchParams.get('destination');
  const navigate = useNavigate();

  const [destination, setDestination] = useState(null);
  const [weather, setWeather] = useState(null);
  const [heroImage, setHeroImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // ================= TOP ATTRACTIONS =================
  const [attractionStart, setAttractionStart] = useState(0);

  const attractionImages = {
    'Baga Beach':
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',

    'Fort Aguada':
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',

    'Basilica of Bom Jesus':
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',

    'Dudhsagar Falls':
      'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=800&q=80',

    'Anjuna Beach':
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',

    Fontainhas:
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
  };

  // ================= AI PLANNER =================

  const [showPlanner, setShowPlanner] = useState(false);

  const [aiItinerary, setAiItinerary] = useState('');
  const [generating, setGenerating] = useState(false);

  // ================= FETCH DATA =================

  useEffect(() => {
    const fetchData = async () => {
      try {
        const destRes = await api.get(
          `/destinations/${encodeURIComponent(destinationName)}`
        );

        setDestination(destRes.data);
      } catch (error) {
        setErrorMessage(
          'Destination not found. Try Goa, Manali, Jaipur, or another famous place.'
        );

        setLoading(false);
        return;
      }

      try {
        const weatherRes = await api.get(
          `/destinations/${encodeURIComponent(destinationName)}/weather`
        );

        setWeather(weatherRes.data);
      } catch {
        // Weather temporarily unavailable.
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
        // No image found — page still works.
      }

      setLoading(false);
    };

    fetchData();
  }, [destinationName]);

  // ================= GENERATE ITINERARY =================

    const handleGenerateItinerary = async (days, people, budget) => {
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
      setAiItinerary("Our AI planner is experiencing high demand right now. Please wait a moment and click 'Generate Itinerary' again.");
    } finally {
      setGenerating(false);
    }
  };

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">
          Loading destination...
        </p>
      </div>
    );
  }

  // ================= ERROR =================

  if (errorMessage) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <p className="text-red-500 text-lg mb-4">
          {errorMessage}
        </p>

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
    <div className="min-h-screen bg-[#f4f7fb] pb-10 relative">

      {/* =====================================================
          HERO
      ====================================================== */}

      {heroImage && (
        <div className="relative w-full h-[420px] sm:h-[500px] overflow-hidden">

          <img
            src={heroImage}
            alt={destination.name}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />

          <div className="absolute inset-0 flex items-end">

            <div className="w-full max-w-5xl mx-auto px-6 pb-10 sm:pb-14">

              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/25 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                📍 {destination.state}, India
              </div>

              <h1 className="text-5xl sm:text-7xl font-extrabold text-white tracking-tight drop-shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
                {destination.name}
              </h1>

              <p className="mt-3 max-w-2xl text-base sm:text-lg text-white/90 leading-relaxed drop-shadow">
                {destination.description}
              </p>

              <button
                onClick={() => {
                  const token = localStorage.getItem('token');

                  if (!token) {
                    navigate('/login');
                  } else {
                    setShowPlanner(true);
                  }
                }}
                className="mt-6 inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                ✨ Plan my trip
                <span>→</span>
              </button>

            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-10">

        {!heroImage && (
          <>
            <h1 className="text-4xl font-bold text-gray-800 mb-1">
              {destination.name}
            </h1>

            <p className="text-gray-500 mb-6">
              {destination.state}
            </p>
          </>
        )}

        <div className="mb-10" />

        {/* =====================================================
            WEATHER
        ====================================================== */}

        {weather && (
          <div className="mb-12">

            <div className="flex items-center justify-between mb-5">

              <div>
                <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                  Live conditions
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-1">
                  Weather in {destination.name}
                </h2>
              </div>

              <span className="text-3xl">
                🌤️
              </span>

            </div>

            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white shadow-xl">

              <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/10 rounded-full" />

              <div className="absolute -bottom-20 -left-10 w-56 h-56 bg-white/10 rounded-full" />

              <div className="relative p-7 sm:p-8">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

                  <div>

                    <p className="text-white/70 text-sm font-medium mb-2">
                      Current Weather
                    </p>

                    <div className="flex items-center gap-4">

                      <span className="text-5xl">
                        🌡️
                      </span>

                      <div>

                        <p className="text-4xl sm:text-5xl font-bold">
                          {weather.temperature}
                        </p>

                        <p className="text-white/80 text-lg mt-1">
                          {weather.condition}
                        </p>

                      </div>

                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-5 min-w-[160px]">

                    <p className="text-white/60 text-sm mb-1">
                      Humidity
                    </p>

                    <p className="text-2xl font-bold">
                      {weather.humidity}
                    </p>

                    <p className="text-white/60 text-sm mt-1">
                      Current level
                    </p>

                  </div>

                </div>
              </div>
            </div>
          </div>
        )}

        {/* =====================================================
            TOP ATTRACTIONS
        ====================================================== */}

        <div className="mb-14">

          {/* Heading */}

          <div className="mb-7">

            <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest">
              Discover
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-1">
              Top Attractions
            </h2>

            <p className="text-gray-500 mt-2">
              Places you shouldn't miss in {destination.name}
            </p>

          </div>

          {/* =================================================
              ATTRACTION CAROUSEL
          ================================================== */}

          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-5 sm:p-7">

            {/* Decorative background */}

            <div className="absolute -top-20 -right-20 w-56 h-56 bg-blue-200/20 rounded-full blur-3xl" />

            <div className="absolute -bottom-24 -left-20 w-64 h-64 bg-indigo-200/20 rounded-full blur-3xl" />

            {/* Cards wrapper */}

            <div className="relative">

              {/* ================= PREVIOUS BUTTON ================= */}

              <button
                onClick={() => setAttractionStart(0)}
                disabled={attractionStart === 0}
                aria-label="Previous attractions"
                className="
                  absolute
                  left-0
                  top-1/2
                  -translate-y-1/2
                  -translate-x-1/2
                  z-20

                  w-14
                  h-14

                  rounded-full

                  bg-white
                  border-2
                  border-blue-200

                  text-blue-600
                  text-3xl

                  flex
                  items-center
                  justify-center

                  shadow-xl

                  hover:bg-blue-600
                  hover:text-white
                  hover:border-blue-600
                  hover:scale-110

                  transition-all
                  duration-200

                  disabled:opacity-0
                  disabled:pointer-events-none
                "
              >
                ←
              </button>

              {/* ================= FOUR CARDS ================= */}

              <div
                className="
                  grid
                  grid-cols-1
                  sm:grid-cols-2
                  lg:grid-cols-4
                  gap-5
                "
              >

                {destination.attractions
                  ?.slice(attractionStart, attractionStart + 4)
                  .map((attraction, index) => (

                    <Link
                      key={attraction.name}
                      to={`/attraction?destination=${encodeURIComponent(
                        destination.name
                      )}&name=${encodeURIComponent(
                        attraction.name
                      )}`}
                      className="
                        group
                        relative
                        overflow-hidden
                        rounded-3xl
                        bg-white
                        border
                        border-white
                        shadow-md
                        hover:shadow-2xl
                        hover:-translate-y-2
                        transition-all
                        duration-300
                      "
                    >

                      {/* Image */}

                      <div className="relative h-48 overflow-hidden">

                        <img
                          src={
                            attractionImages[attraction.name] ||
                            heroImage
                          }
                          alt={attraction.name}
                          className="
                            w-full
                            h-full
                            object-cover
                            group-hover:scale-110
                            transition-transform
                            duration-700
                          "
                        />

                        {/* Overlay */}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                        {/* Number */}

                        <div className="
                          absolute
                          top-3
                          left-3
                          w-10
                          h-10
                          rounded-xl
                          bg-white/90
                          backdrop-blur-sm
                          text-blue-600
                          flex
                          items-center
                          justify-center
                          font-bold
                          text-sm
                          shadow-lg
                        ">
                          {String(
                            attractionStart + index + 1
                          ).padStart(2, '0')}
                        </div>

                        {/* Explore */}

                        <div className="
                          absolute
                          bottom-3
                          right-3
                          px-3
                          py-1.5
                          rounded-full
                          bg-black/40
                          backdrop-blur-md
                          text-white
                          text-[10px]
                          font-semibold
                          tracking-wide
                          opacity-0
                          group-hover:opacity-100
                          transition-opacity
                          duration-300
                        ">
                          EXPLORE →
                        </div>

                      </div>

                      {/* Card content */}

                      <div className="p-5">

                        <p className="
                          text-[10px]
                          font-bold
                          tracking-[0.18em]
                          text-blue-600
                          uppercase
                          mb-2
                        ">
                          Must Visit
                        </p>

                        <h3 className="
                          text-lg
                          font-bold
                          text-gray-900
                          leading-snug
                          group-hover:text-blue-600
                          transition-colors
                          duration-300
                        ">
                          {attraction.name}
                        </h3>

                        <p className="
                          text-sm
                          text-gray-500
                          leading-5
                          mt-2
                          line-clamp-2
                        ">
                          {attraction.description}
                        </p>

                        <div className="
                          flex
                          items-center
                          justify-between
                          mt-5
                          pt-3
                          border-t
                          border-gray-100
                        ">

                          <span className="
                            text-xs
                            font-semibold
                            text-gray-400
                            group-hover:text-blue-600
                            transition-colors
                          ">
                            Discover
                          </span>

                          <span className="
                            w-8
                            h-8
                            rounded-full
                            bg-blue-50
                            text-blue-600
                            flex
                            items-center
                            justify-center
                            group-hover:bg-blue-600
                            group-hover:text-white
                            group-hover:translate-x-1
                            transition-all
                            duration-300
                          ">
                            →
                          </span>

                        </div>

                      </div>

                    </Link>

                  ))}

              </div>

              {/* ================= NEXT BUTTON ================= */}

              <button
                onClick={() => setAttractionStart(4)}
                disabled={
                  !destination.attractions ||
                  destination.attractions.length <= 4 ||
                  attractionStart === 4
                }
                aria-label="Next attractions"
                className="
                  absolute
                  right-0
                  top-1/2
                  -translate-y-1/2
                  translate-x-1/2
                  z-20

                  w-14
                  h-14

                  rounded-full

                  bg-white
                  border-2
                  border-blue-200

                  text-blue-600
                  text-3xl

                  flex
                  items-center
                  justify-center

                  shadow-xl

                  hover:bg-blue-600
                  hover:text-white
                  hover:border-blue-600
                  hover:scale-110

                  transition-all
                  duration-200

                  disabled:opacity-0
                  disabled:pointer-events-none
                "
              >
                →
              </button>

            </div>

          </div>

        </div>

        {/* =====================================================
            WHERE TO STAY
        ====================================================== */}

        <div className="mb-14 rounded-[2rem] bg-gradient-to-br from-blue-50/70 via-white to-indigo-50/60 p-6 sm:p-8 border border-blue-100/60 shadow-sm">

          <div className="flex items-end justify-between mb-7">

            <div>

              <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest">
                Stay
              </p>

              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-1">
                Where to Stay
              </h2>

              <p className="text-gray-500 mt-2">
                From budget-friendly gems to luxury stays
              </p>

            </div>

            <span className="hidden sm:block text-5xl">
              🏨
            </span>

          </div>

          <div className="grid sm:grid-cols-3 gap-5">

            {destination.hotels.map((hotel, index) => (

              <div
                key={hotel.name}
                className={`
                  group
                  relative
                  overflow-hidden
                  rounded-3xl
                  border
                  shadow-sm
                  hover:shadow-2xl
                  hover:-translate-y-2
                  transition-all
                  duration-500
                  ${
                    index === 0
                      ? 'bg-gradient-to-br from-emerald-50 via-white to-green-50 border-emerald-100'
                      : index === 1
                      ? 'bg-gradient-to-br from-sky-50 via-white to-blue-50 border-sky-100'
                      : 'bg-gradient-to-br from-violet-50 via-white to-purple-50 border-violet-100'
                  }
                `}
              >

                <div
                  className={`
                    absolute
                    -top-20
                    -right-20
                    w-52
                    h-52
                    rounded-full
                    blur-2xl
                    opacity-50
                    group-hover:scale-125
                    transition-transform
                    duration-700
                    ${
                      index === 0
                        ? 'bg-emerald-200'
                        : index === 1
                        ? 'bg-sky-200'
                        : 'bg-violet-200'
                    }
                  `}
                />

                <div
                  className={`
                    absolute
                    -top-12
                    -right-12
                    w-36
                    h-36
                    rounded-full
                    opacity-60
                    group-hover:scale-125
                    transition-transform
                    duration-500
                    ${
                      index === 0
                        ? 'bg-emerald-100'
                        : index === 1
                        ? 'bg-sky-100'
                        : 'bg-violet-100'
                    }
                  `}
                />

                <div className="relative p-6">

                  <div className="flex items-center justify-between mb-7">

                    <span
                      className={`
                        text-5xl
                        font-extrabold
                        ${
                          index === 0
                            ? 'text-emerald-200'
                            : index === 1
                            ? 'text-sky-200'
                            : 'text-violet-200'
                        }
                      `}
                    >
                      0{index + 1}
                    </span>

                    <span
                      className={`
                        w-12
                        h-12
                        rounded-2xl
                        flex
                        items-center
                        justify-center
                        text-xl
                        shadow-sm
                        group-hover:scale-110
                        group-hover:rotate-3
                        transition-all
                        duration-300
                        ${
                          index === 0
                            ? 'bg-emerald-100'
                            : index === 1
                            ? 'bg-sky-100'
                            : 'bg-violet-100'
                        }
                      `}
                    >
                      {index === 0
                        ? '💰'
                        : index === 1
                        ? '🏨'
                        : '✨'}
                    </span>

                  </div>

                  <h3
                    className={`
                      text-xl
                      font-bold
                      text-gray-900
                      leading-snug
                      transition-colors
                      duration-300
                      ${
                        index === 0
                          ? 'group-hover:text-emerald-600'
                          : index === 1
                          ? 'group-hover:text-sky-600'
                          : 'group-hover:text-violet-600'
                      }
                    `}
                  >
                    {hotel.name}
                  </h3>

                  <div className="mt-4">

                    <span
                      className={`
                        inline-flex
                        items-center
                        text-xs
                        font-bold
                        px-3
                        py-1.5
                        rounded-full
                        ${
                          index === 0
                            ? 'text-emerald-700 bg-emerald-100'
                            : index === 1
                            ? 'text-sky-700 bg-sky-100'
                            : 'text-violet-700 bg-violet-100'
                        }
                      `}
                    >
                      {hotel.priceRange}
                    </span>

                  </div>

                  <div className="mt-6 flex items-baseline gap-2">

                    <span className="text-3xl font-extrabold text-gray-900">
                      ₹{hotel.pricePerNight}
                    </span>

                    <span className="text-sm text-gray-400">
                      / night
                    </span>

                  </div>

                  <div className="mt-7 flex items-center justify-between">

                    <span
                      className={`
                        text-sm
                        font-semibold
                        text-gray-400
                        transition-colors
                        duration-300
                        ${
                          index === 0
                            ? 'group-hover:text-emerald-600'
                            : index === 1
                            ? 'group-hover:text-sky-600'
                            : 'group-hover:text-violet-600'
                        }
                      `}
                    >
                      View stay
                    </span>

                    <span
                      className={`
                        text-lg
                        group-hover:translate-x-2
                        transition-transform
                        duration-300
                        ${
                          index === 0
                            ? 'text-emerald-600'
                            : index === 1
                            ? 'text-sky-600'
                            : 'text-violet-600'
                        }
                      `}
                    >
                      →
                    </span>

                  </div>

                  <div
                    className={`
                      mt-6
                      h-1.5
                      w-12
                      rounded-full
                      group-hover:w-full
                      transition-all
                      duration-700
                      ${
                        index === 0
                          ? 'bg-gradient-to-r from-emerald-400 to-green-500'
                          : index === 1
                          ? 'bg-gradient-to-r from-sky-400 to-blue-500'
                          : 'bg-gradient-to-r from-violet-400 to-purple-500'
                      }
                    `}
                  />

                </div>

              </div>

            ))}

          </div>
        </div>

        {/* =====================================================
            TRAVEL INFORMATION
        ====================================================== */}

        <div className="mb-14">

          <div className="flex items-end justify-between mb-7">

            <div>

              <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest">
                Travel Guide
              </p>

              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-1">
                Plan Your Visit
              </h2>

              <p className="text-gray-500 mt-2">
                Everything you need to know before visiting {destination.name}
              </p>

            </div>

            <span className="hidden sm:block text-5xl">
              🧭
            </span>

          </div>

          <div className="grid sm:grid-cols-3 gap-5">

            {/* Airport */}

            <div className="group relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-white rounded-3xl p-6 border border-sky-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">

              <div className="absolute -top-12 -right-12 w-32 h-32 bg-sky-100 rounded-full group-hover:scale-125 transition-transform duration-500" />

              <div className="relative">

                <div className="flex items-center justify-between mb-6">

                  <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                    ✈️
                  </span>

                  <span className="text-xs font-bold tracking-wider text-sky-600 bg-sky-100 px-3 py-1.5 rounded-full">
                    AIRPORT
                  </span>

                </div>

                <p className="text-sm text-gray-500 mb-2">
                  Nearest Airport
                </p>

                <h3 className="text-xl font-bold text-gray-900 leading-snug">
                  {destination.nearestAirport}
                </h3>

                <div className="mt-6 flex items-center text-sm font-semibold text-sky-600">
                  Getting there
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>

                <div className="mt-5 h-1 w-10 bg-sky-500 rounded-full group-hover:w-full transition-all duration-500" />

              </div>
            </div>

            {/* Railway */}

            <div className="group relative overflow-hidden bg-gradient-to-br from-violet-50 via-white to-white rounded-3xl p-6 border border-violet-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">

              <div className="absolute -top-12 -right-12 w-32 h-32 bg-violet-100 rounded-full group-hover:scale-125 transition-transform duration-500" />

              <div className="relative">

                <div className="flex items-center justify-between mb-6">

                  <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                    🚆
                  </span>

                  <span className="text-xs font-bold tracking-wider text-violet-600 bg-violet-100 px-3 py-1.5 rounded-full">
                    RAILWAY
                  </span>

                </div>

                <p className="text-sm text-gray-500 mb-2">
                  Nearest Railway Station
                </p>

                <h3 className="text-xl font-bold text-gray-900 leading-snug">
                  {destination.nearestRailwayStation}
                </h3>

                <div className="mt-6 flex items-center text-sm font-semibold text-violet-600">
                  Getting there
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>

                <div className="mt-5 h-1 w-10 bg-violet-500 rounded-full group-hover:w-full transition-all duration-500" />

              </div>
            </div>

            {/* Best Time */}

            <div className="group relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-white rounded-3xl p-6 border border-amber-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">

              <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-100 rounded-full group-hover:scale-125 transition-transform duration-500" />

              <div className="relative">

                <div className="flex items-center justify-between mb-6">

                  <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                    🌤️
                  </span>

                  <span className="text-xs font-bold tracking-wider text-amber-600 bg-amber-100 px-3 py-1.5 rounded-full">
                    BEST TIME
                  </span>

                </div>

                <p className="text-sm text-gray-500 mb-2">
                  Best Time to Visit
                </p>

                <h3 className="text-xl font-bold text-gray-900 leading-snug">
                  {destination.bestTimeToVisit}
                </h3>

                <div className="mt-6 flex items-center text-sm font-semibold text-amber-600">
                  Plan accordingly
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>

                <div className="mt-5 h-1 w-10 bg-amber-500 rounded-full group-hover:w-full transition-all duration-500" />

              </div>
            </div>

          </div>
        </div>

        {/* =====================================================
            FLOATING AI BUTTON
        ====================================================== */}

        <button
          onClick={() => {
            const token = localStorage.getItem('token');

            if (!token) {
              navigate('/login');
            } else {
              setShowPlanner(true);
            }
          }}
          className="fixed bottom-6 right-6 bg-blue-600 text-white px-5 py-4 rounded-full shadow-lg hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all duration-150 z-40"
        >
          ✨ Plan with AI
        </button>

        {/* =====================================================
            AI PLANNER
        ====================================================== */}

                {showPlanner && !aiItinerary && (
          <TripPlannerModal
            destinationName={destination.name}
            heroImage={heroImage}
            onClose={() => setShowPlanner(false)}
            onGenerate={handleGenerateItinerary}
            generating={generating}
          />
        )}

        {showPlanner && aiItinerary && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl max-h-[88vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Your AI trip plan</h2>
                <button
                  onClick={() => setShowPlanner(false)}
                  className="text-gray-400 hover:text-gray-700 transition"
                >
                  ✕
                </button>
              </div>
              <div className="prose prose-sm sm:prose-base prose-headings:text-blue-700 prose-strong:text-gray-800 max-w-none">
                <ReactMarkdown>{aiItinerary}</ReactMarkdown>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default ItineraryPage;