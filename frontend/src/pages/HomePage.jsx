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

            const url =
              wikiRes.data.originalimage?.source ||
              wikiRes.data.thumbnail?.source;

            if (url) {
              setImages((prev) => ({
                ...prev,
                [dest.name]: url,
              }));
            }
          } catch {
            // Image unavailable for this destination.
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
      navigate(
        `/itinerary?destination=${encodeURIComponent(searchText.trim())}`
      );
    }
  };

  const handleAiClick = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
    } else if (searchText.trim()) {
      navigate(
        `/itinerary?destination=${encodeURIComponent(searchText.trim())}`
      );
    } else {
      alert('Please search or pick a destination first!');
    }
  };

  /*
    ----------------------------------------------------
    DESTINATION GROUPS
    ----------------------------------------------------
  */

  const popularNames = ['Jaipur', 'Mumbai', 'Goa'];

  const mountainNames = ['Manali', 'Shimla', 'Rishikesh'];

  const exploreNames = ['Delhi', 'Varanasi', 'Udaipur'];

  const getDestination = (name) =>
    destinations.find(
      (dest) => dest.name.toLowerCase() === name.toLowerCase()
    );

  const popularDestinations = popularNames
    .map(getDestination)
    .filter(Boolean);

  const mountainDestinations = mountainNames
    .map(getDestination)
    .filter(Boolean);

  const exploreDestinations = exploreNames
    .map(getDestination)
    .filter(Boolean);

  /*
    ----------------------------------------------------
    DESTINATION CARD
    ----------------------------------------------------
  */

  const DestinationCard = ({
    destination,
    label,
    labelIcon,
  }) => {
    if (!destination) return null;

    return (
      <Link
        to={`/itinerary?destination=${encodeURIComponent(destination.name)}`}
        className="group relative block h-[245px] overflow-hidden rounded-[22px] shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
      >
        {images[destination.name] ? (
          <img
            src={images[destination.name]}
            alt={destination.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-300 via-indigo-300 to-purple-300" />
        )}

        {/* Dark image overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/5" />

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-md text-gray-900 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">
            {labelIcon} {label}
          </span>
        </div>

        {/* Arrow */}
        <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-gray-900 text-lg font-bold shadow-md transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110">
          →
        </div>

        {/* Destination information */}
        <div className="absolute bottom-5 left-5 right-5">
          <h3 className="text-white text-2xl font-extrabold drop-shadow-lg">
            {destination.name}
          </h3>

          <p className="text-white/90 text-sm mt-1 flex items-center gap-1">
            <span>⌖</span>
            {destination.state}
          </p>
        </div>
      </Link>
    );
  };

  /*
    ----------------------------------------------------
    SECTION COMPONENT
    ----------------------------------------------------
  */

  const DestinationSection = ({
    title,
    subtitle,
    icon,
    destinationsList,
    sectionClass,
    iconClass,
    badge,
  }) => {
    return (
      <section
        className={`relative overflow-hidden rounded-[28px] border border-white/70 shadow-sm p-6 sm:p-8 lg:p-9 ${sectionClass}`}
      >
        {/* Decorative circles */}
        <div className="absolute -top-24 -right-20 w-64 h-64 rounded-full bg-white/30 blur-sm" />

        <div className="absolute -bottom-32 -left-24 w-72 h-72 rounded-full bg-white/20" />

        <div className="relative z-10">
          {/* Section heading */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-7">
            <div className="flex items-start gap-4">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm ${iconClass}`}
              >
                {icon}
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600/80 mb-1">
                  {badge}
                </p>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                  {title}
                </h2>

                <p className="text-gray-600 mt-1 text-sm sm:text-base">
                  {subtitle}
                </p>
              </div>
            </div>

            <button
              type="button"
              className="self-start sm:self-center bg-white/80 backdrop-blur-md border border-white text-gray-900 px-5 py-2.5 rounded-full font-semibold text-sm shadow-sm hover:bg-white hover:shadow-md transition-all"
            >
              View all →
            </button>
          </div>

          {/* Destination cards */}
          {destinationsList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {destinationsList.map((destination) => (
                <DestinationCard
                  key={destination._id}
                  destination={destination}
                  label={badge}
                  labelIcon={icon}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white/40 rounded-2xl p-6 text-gray-600">
              Destinations are loading...
            </div>
          )}
        </div>
      </section>
    );
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isDark
          ? 'bg-[#0b1220] text-white'
          : 'bg-gradient-to-b from-sky-100 via-indigo-50 to-orange-50 text-gray-900'
      }`}
    >
      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-3">
        <div className="max-w-6xl mx-auto">
          <div
            className={`rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between gap-4 shadow-lg border backdrop-blur-xl ${
              isDark
                ? 'bg-gray-900/85 border-gray-700'
                : 'bg-white/90 border-white'
            }`}
          >
            {/* Logo */}
            <Link
              to="/"
              className={`flex items-center gap-2 text-lg sm:text-xl font-extrabold whitespace-nowrap ${
                isDark ? 'text-white' : 'text-[#111b3a]'
              }`}
            >
              <span className="text-2xl">✈️</span>
              <span className="hidden sm:inline">AI Travel Planner</span>
              <span className="sm:hidden">AI Travel</span>
            </Link>

            {/* Search */}
            <form
              onSubmit={handleSearch}
              className="flex-1 max-w-md hidden md:block"
            >
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  ⌕
                </span>

                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Search a destination..."
                  className={`w-full rounded-full pl-11 pr-5 py-2.5 outline-none transition border ${
                    isDark
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500'
                      : 'bg-slate-100/80 border-transparent text-gray-800 focus:bg-white focus:ring-2 focus:ring-blue-400'
                  }`}
                />
              </div>
            </form>

            {/* Right controls */}
            <div className="flex items-center gap-2 sm:gap-3 whitespace-nowrap">
              <button
                onClick={handleAiClick}
                className="hidden sm:inline-flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-4 py-2.5 rounded-full font-semibold text-sm shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                ✨ Plan with AI
              </button>

              <button
                onClick={toggleTheme}
                className={`text-lg w-10 h-10 flex items-center justify-center rounded-full hover:scale-110 active:scale-95 transition-all ${
                  isDark
                    ? 'bg-gray-700 text-yellow-300'
                    : 'bg-slate-100 text-gray-800'
                }`}
                aria-label="Toggle theme"
              >
                {isDark ? '☀' : '☽'}
              </button>

              {userName ? (
                <button
                  onClick={handleLogout}
                  className={`text-xs sm:text-sm px-3 sm:px-4 py-2.5 rounded-full transition ${
                    isDark
                      ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      : 'bg-slate-100 text-gray-600 hover:bg-slate-200 hover:text-red-500'
                  }`}
                >
                  Log out
                </button>
              ) : (
                <Link
                  to="/login"
                  className={`text-xs sm:text-sm px-3 sm:px-4 py-2.5 rounded-full border transition ${
                    isDark
                      ? 'border-gray-600 text-gray-200 hover:bg-gray-700'
                      : 'border-gray-200 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Log in / Sign up
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative min-h-[590px] sm:min-h-[650px] overflow-hidden pt-28">
        {/* Sky background */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-sky-100 to-indigo-100" />

        {/* Sun */}
        <div className="absolute right-[8%] top-[120px] w-36 h-36 sm:w-48 sm:h-48 rounded-full bg-yellow-100/80 blur-xl" />

        <div className="absolute right-[11%] top-[145px] w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-yellow-200 shadow-[0_0_80px_rgba(255,220,100,0.8)]" />

        {/* Clouds */}
        <div className="absolute top-44 left-[5%] w-32 h-12 bg-white/50 rounded-full blur-md" />

        <div className="absolute top-52 left-[13%] w-48 h-16 bg-white/40 rounded-full blur-lg" />

        <div className="absolute top-36 right-[20%] w-44 h-12 bg-white/40 rounded-full blur-lg" />

        {/* Mountains */}
        <div className="absolute bottom-0 left-0 right-0 h-72">
          <div
            className="absolute inset-0 opacity-90"
            style={{
              clipPath:
                'polygon(0 55%, 10% 42%, 18% 58%, 28% 28%, 38% 60%, 49% 36%, 59% 65%, 70% 38%, 80% 60%, 91% 30%, 100% 53%, 100% 100%, 0 100%)',
              background:
                'linear-gradient(160deg, #8ab4d8, #6394c0 55%, #477ca9)',
            }}
          />

          <div
            className="absolute inset-0 opacity-60"
            style={{
              clipPath:
                'polygon(0 75%, 15% 52%, 27% 74%, 42% 50%, 54% 72%, 67% 45%, 80% 72%, 90% 52%, 100% 68%, 100% 100%, 0 100%)',
              background:
                'linear-gradient(160deg, #477ca9, #315e88)',
            }}
          />
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 pt-16 sm:pt-20">
          <div className="max-w-2xl">
            <p className="text-blue-700 font-bold tracking-[0.25em] uppercase text-sm mb-4">
              Discover • Plan • Experience
            </p>

            <h1
              className={`text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[0.98] tracking-tight ${
                isDark ? 'text-gray-900' : 'text-[#101a3a]'
              }`}
            >
              {userName
                ? `Hey ${userName}, where to next?`
                : 'Explore famous places across'}
              {!userName && (
                <span className="block text-blue-600 italic mt-2">
                  India
                </span>
              )}
            </h1>

            <p className="mt-5 text-lg sm:text-xl text-gray-700 max-w-xl">
              Discover beautiful destinations, create personalized trips and
              let AI plan your next adventure.
            </p>

            {/* Hero feature pills */}
            <div className="flex flex-wrap gap-3 mt-7">
              <span className="bg-white/80 backdrop-blur-md border border-white px-4 py-2.5 rounded-full text-sm font-semibold text-gray-800 shadow-sm">
                ✨ AI Powered Itineraries
              </span>

              <span className="bg-white/80 backdrop-blur-md border border-white px-4 py-2.5 rounded-full text-sm font-semibold text-gray-800 shadow-sm">
                💼 Budget Friendly Plans
              </span>

              <span className="bg-white/80 backdrop-blur-md border border-white px-4 py-2.5 rounded-full text-sm font-semibold text-gray-800 shadow-sm">
                📍 Explore 50+ Cities
              </span>
            </div>

            {/* Mobile search */}
            <form
              onSubmit={handleSearch}
              className="md:hidden mt-5 flex gap-2"
            >
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search a destination..."
                className="flex-1 bg-white/90 rounded-full px-5 py-3 outline-none shadow-md"
              />

              <button
                type="submit"
                className="bg-blue-600 text-white px-5 rounded-full font-semibold"
              >
                →
              </button>
            </form>
          </div>
        </div>

        {/* Plane */}
        <div className="absolute right-[15%] top-[250px] text-4xl sm:text-5xl rotate-[-8deg] z-10">
          ✈️
        </div>

        {/* Flight trail */}
        <div className="absolute right-[17%] top-[280px] w-48 border-t-2 border-dashed border-white/70 rotate-[-8deg]" />
      </section>

      {/* =====================================================
          DESTINATION CONTENT
      ====================================================== */}

      <main
        className={`relative px-4 sm:px-6 pb-16 ${
          isDark ? 'bg-[#0b1220]' : 'bg-gradient-to-b from-indigo-50 to-orange-50'
        }`}
      >
        <div className="max-w-6xl mx-auto space-y-7 -mt-8 relative z-20">
          {/* =================================================
              POPULAR DESTINATIONS
          ================================================== */}

          <DestinationSection
            title="Popular Destinations"
            subtitle="Start your journey with India's most loved destinations."
            icon="👑"
            badge="Popular"
            destinationsList={popularDestinations}
            sectionClass="bg-gradient-to-br from-purple-100 via-pink-50 to-rose-100"
            iconClass="bg-white/70"
          />

          {/* =================================================
              MOUNTAIN ESCAPES
          ================================================== */}

          <DestinationSection
            title="Mountain Escapes"
            subtitle="Breathtaking mountains, peaceful valleys and fresh air."
            icon="🏔️"
            badge="Mountains"
            destinationsList={mountainDestinations}
            sectionClass="bg-gradient-to-br from-cyan-100 via-sky-50 to-emerald-50"
            iconClass="bg-white/70"
          />

          {/* =================================================
              EXPLORE INDIA
          ================================================== */}

          <DestinationSection
            title="Explore India"
            subtitle="More incredible places waiting to be explored."
            icon="🧭"
            badge="Explore"
            destinationsList={exploreDestinations}
            sectionClass="bg-gradient-to-br from-orange-100 via-amber-50 to-yellow-100"
            iconClass="bg-white/70"
          />

          {/* =================================================
              EXTRA DESTINATIONS
          ================================================== */}

          {destinations.length > 9 && (
            <section className="pt-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px flex-1 bg-gray-300/50" />

                <p className="text-sm font-bold tracking-widest uppercase text-gray-500">
                  More places to explore
                </p>

                <div className="h-px flex-1 bg-gray-300/50" />
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {destinations
                  .filter(
                    (dest) =>
                      ![
                        ...popularNames,
                        ...mountainNames,
                        ...exploreNames,
                      ].some(
                        (name) =>
                          name.toLowerCase() === dest.name.toLowerCase()
                      )
                  )
                  .map((destination) => (
                    <DestinationCard
                      key={destination._id}
                      destination={destination}
                      label="Explore"
                      labelIcon="🧭"
                    />
                  ))}
              </div>
            </section>
          )}

          {/* =================================================
              AI CTA
          ================================================== */}

          <section className="relative overflow-hidden rounded-[30px] bg-gradient-to-r from-[#151f66] via-[#242c86] to-[#111936] text-white px-7 sm:px-12 py-10 sm:py-12 shadow-xl">
            {/* Decorative lines */}
            <div className="absolute -right-20 -top-32 w-80 h-80 rounded-full border border-white/10" />

            <div className="absolute -right-8 -top-20 w-64 h-64 rounded-full border border-white/10" />

            <div className="absolute -left-24 -bottom-32 w-72 h-72 rounded-full border border-white/10" />

            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-7">
              <div>
                <p className="text-blue-200 text-sm font-semibold uppercase tracking-widest mb-2">
                  Travel smarter
                </p>

                <h2 className="text-3xl sm:text-4xl font-extrabold">
                  Plan Your Next Adventure
                </h2>

                <p className="text-white/70 mt-2">
                  Let AI craft the perfect itinerary for you.
                </p>
              </div>

              <button
                onClick={handleAiClick}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-blue-500 px-6 py-3.5 rounded-full font-bold shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
              >
                ✨ Plan with AI
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <Footer />

      {/* =====================================================
          FLOATING MOBILE AI BUTTON
      ====================================================== */}

      <button
        onClick={handleAiClick}
        className="sm:hidden fixed bottom-5 right-5 z-40 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-5 py-3.5 rounded-full shadow-2xl font-semibold"
      >
        ✨ Plan with AI
      </button>
    </div>
  );
}

export default HomePage;