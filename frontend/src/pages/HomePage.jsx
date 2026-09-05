import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useTheme } from '../hooks/useTheme';

function HomePage() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [userName, setUserName] = useState('');
  const [explorePage, setExplorePage] = useState(0);

  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    setUserName(localStorage.getItem('userName') || '');

    const fetchDestinations = async () => {
      try {
        const res = await api.get('/destinations');
        setDestinations(res.data);
      } catch (error) {
        console.error('Failed to load destinations', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

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

  const handleLogout = () => {
    localStorage.clear();
    setUserName('');
    navigate('/');
  };

  const getDestination = (name) => {
    return destinations.find(
      (dest) => dest.name.toLowerCase() === name.toLowerCase()
    );
  };

  /* ================= DESTINATIONS ================= */

  const popular = [
    {
      name: 'Jaipur',
      state: 'Rajasthan',
      image: '/images/jaipur.jpg',
    },
    {
      name: 'Mumbai',
      state: 'Maharashtra',
      image: '/images/mumbai.jpg',
    },
    {
      name: 'Goa',
      state: 'Goa',
      image: '/images/goa.jpg',
    },
  ];

  const mountains = [
    {
      name: 'Manali',
      state: 'Himachal Pradesh',
      image: '/images/manali.jpg',
    },
    {
      name: 'Shimla',
      state: 'Himachal Pradesh',
      image: '/images/shimla.jpg',
    },
    {
      name: 'Rishikesh',
      state: 'Uttarakhand',
      image: '/images/rishikesh.jpg',
    },
  ];

  const explorePages = [
  [
    {
      name: 'Delhi',
      state: 'Delhi',
      image: '/images/delhi.jpg',
    },
    {
      name: 'Varanasi',
      state: 'Uttar Pradesh',
      image: '/images/varanasi.jpg',
    },
    {
      name: 'Udaipur',
      state: 'Rajasthan',
      image: '/images/udaipur.jpg',
    },
  ],

  [
    {
      name: 'Agra',
      state: 'Uttar Pradesh',
      image: '/images/agra.jpg',
    },
    {
      name: 'Amritsar',
      state: 'Punjab',
      image: '/images/amritsar.jpg',
    },
    {
      name: 'Darjeeling',
      state: 'West Bengal',
      image: '/images/darjeeling.jpg',
    },
  ],

  [
    {
      name: 'Srinagar',
      state: 'Jammu & Kashmir',
      image: '/images/srinagar.jpg',
    },
    {
      name: 'Khajuraho',
      state: 'Madhya Pradesh',
      image: '/images/khajuraho.jpg',
    },
    {
      name: 'Andaman Islands',
      state: 'Andaman & Nicobar Islands',
      image: '/images/andaman.jpg',
    },
  ],
];

  /* ================= DESTINATION CARD ================= */

  const DestinationCard = ({ place, label }) => {
    return (
      <Link
        to={`/itinerary?destination=${place.name}`}
        className="group relative block h-[245px] overflow-hidden rounded-[18px] shadow-lg"
      >
        <img
          src={place.image}
          alt={place.name}
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Category badge */}
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-900 shadow">
           {label}
        </div>

        {/* Card content */}
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div>
            <h3 className="text-2xl font-extrabold text-white drop-shadow-lg">
              {place.name}
            </h3>

            <p className="mt-1 text-sm font-medium text-white">
              📍 {place.state}
            </p>
          </div>

          {/* Arrow */}
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-2xl text-white backdrop-blur-md transition group-hover:bg-white group-hover:text-blue-600">
            →
          </div>
        </div>
      </Link>
    );
  };

  /* ================= SECTION ================= */

  const DestinationSection = ({
    icon,
    title,
    subtitle,
    places,
    type,
    sectionClass,
  }) => (
    <section
      className={`relative mx-auto mb-6 max-w-[1100px] overflow-hidden rounded-[25px] border border-white/80 p-8 shadow-sm ${sectionClass}`}
    >
      <div className="relative z-10">

        {/* Section heading */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="flex items-center gap-3 text-3xl font-extrabold text-[#07184a]">
              <span className="text-4xl">{icon}</span>
              {title}
            </h2>

            <p className="ml-14 mt-1 text-sm text-[#263d70]">
              {subtitle}
            </p>
          </div>
        <Link
        to="/explore"
        className="rounded-full border border-white bg-white/70 px-5 py-3 text-sm font-bold text-[#07184a] shadow-sm backdrop-blur transition hover:bg-white"
>
  View all →
</Link>
        </div>

        {/* Cards */}
        <div className="grid gap-5 md:grid-cols-3">
          {places.map((place) => (
            <DestinationCard
              key={place.name}
              place={place}
              label={type}
            />
          ))}
        </div>
      </div>
    </section>
  );

  const nextExplorePage = () => {
  setExplorePage((prev) => (prev + 1) % explorePages.length);
};

  return (
    <div className="min-h-screen bg-[#dff3ff] text-slate-900">

      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <nav className="relative z-30 mx-auto mt-3 max-w-[1100px] rounded-[18px] border border-white/80 bg-white/90 px-5 py-3 shadow-lg backdrop-blur-md">
        <div className="flex items-center justify-between gap-4">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 whitespace-nowrap text-lg font-extrabold text-[#07184a]"
          >
            <span className="text-3xl">✈️</span>
            AI Travel Planner
          </Link>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="hidden flex-1 max-w-[370px] md:block"
          >
            <div className="flex items-center rounded-full bg-[#eef3fa] px-4 py-2.5">

              <span className="mr-3 text-lg">
                ⌕
              </span>

              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search a destination..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
              />

            </div>
          </form>

          {/* Right buttons */}
          <div className="flex items-center gap-2">

            <button
              onClick={handleAiClick}
              className="rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:scale-105"
            >
              ✨ Plan with AI
            </button>

            <button
              onClick={toggleTheme}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eef3fa] text-xl transition hover:scale-105"
              aria-label="Toggle theme"
            >
              {isDark ? '☀' : '☾'}
            </button>

            {userName ? (
              <button
                onClick={handleLogout}
                className="hidden rounded-full bg-[#eef3fa] px-5 py-3 text-sm font-medium text-slate-700 md:block"
              >
                Log out
              </button>
            ) : (
              <Link
                to="/login"
                className="hidden rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 md:block"
              >
                Log in / Sign up
              </Link>
            )}

          </div>
        </div>
      </nav>

      {/* =====================================================
          HERO SECTION
      ====================================================== */}

      <section className="relative -mt-[75px] min-h-[480px] overflow-hidden pt-[125px]">

        {/* Hero background */}
        <img
          src="/images/hero-bg.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Soft overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/5 to-[#dff3ff]" />

        {/* Airplane */}
        <img
          src="/images/airplane.png"
          alt=""
          className="absolute right-[20%] top-[220px] z-10 w-[90px] rotate-[-5deg]"
        />

        {/* Hero content */}
        <div className="relative z-10 mx-auto max-w-[1100px] px-6 pt-10">

          <p className="mb-5 text-sm font-bold tracking-[5px] text-blue-700">
            DISCOVER&nbsp; • &nbsp;PLAN&nbsp; • &nbsp;EXPERIENCE
          </p>

          {/* Main heading */}
          <h1 className="max-w-[700px] text-5xl font-black leading-[0.98] tracking-tight text-[#07184a] md:text-[64px]">

            {userName ? (
              <>
                Hey {userName}, where to
                <br />
                next?
              </>
            ) : (
              <>
                Explore famous places
                <br />
                across{' '}
                <span className="font-serif italic text-blue-600">
                  India
                </span>
              </>
            )}

          </h1>

          {/* Description */}
          <p className="mt-5 max-w-[650px] text-lg text-[#274474]">
            Discover beautiful destinations, create personalized trips and let
            AI plan your next adventure.
          </p>

          {/* Feature pills */}
          <div className="mt-7 flex flex-wrap gap-3">

            <div className="rounded-full border border-white bg-white/75 px-5 py-3 text-sm font-semibold text-[#132452] shadow-md backdrop-blur">
              ✨ AI Powered Itineraries
            </div>

            <div className="rounded-full border border-white bg-white/75 px-5 py-3 text-sm font-semibold text-[#132452] shadow-md backdrop-blur">
              💼 Budget Friendly Plans
            </div>

            <div className="rounded-full border border-white bg-white/75 px-5 py-3 text-sm font-semibold text-[#132452] shadow-md backdrop-blur">
              📍 Explore 15+ Cities
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          DESTINATION SECTIONS
      ====================================================== */}

      <main className="relative bg-gradient-to-b from-[#dff3ff] via-[#eef8ff] to-[#fff5df] px-4 pb-10 pt-4">

        {loading ? (
          <div className="py-20 text-center text-slate-500">
            Loading destinations...
          </div>
        ) : (
          <>
            {/* POPULAR DESTINATIONS */}

            <DestinationSection
              // icon="👑"
              title="Popular Destinations"
              subtitle="Start your journey with India's most loved destinations."
              places={popular}
              type="Popular"
              sectionClass="bg-gradient-to-br from-[#e5ddff] via-[#f3edff] to-[#fff4fb]"
            />

            {/* MOUNTAIN ESCAPES */}

            <DestinationSection
              // icon="🏔️"
              title="Mountain Escapes"
              subtitle="Breathtaking mountains, peaceful valleys and fresh air."
              places={mountains}
              type="Mountains"
              sectionClass="bg-gradient-to-br from-[#bdeefa] via-[#d8f8f5] to-[#c9f3e5]"
            />

           {/* EXPLORE INDIA */}

<section className="relative mx-auto mb-6 max-w-[1100px] overflow-hidden rounded-[25px] border border-white/80 bg-gradient-to-br from-[#ffe0a8] via-[#fff0d0] to-[#fff8e8] p-8 shadow-sm">

  <div className="relative z-10">

    {/* Section heading */}
    <div className="mb-6 flex items-center justify-between gap-4">

      <div>
        <h2 className="flex items-center gap-3 text-3xl font-extrabold text-[#07184a]">
          <span className="text-4xl"></span>
          Explore India
        </h2>

        <p className="ml-14 mt-1 text-sm text-[#263d70]">
          More incredible places waiting to be explored.
        </p>
      </div>

      {/* View All */}
      <button
        onClick={nextExplorePage}
        className="rounded-full border border-white bg-white/70 px-5 py-3 text-sm font-bold text-[#07184a] shadow-sm backdrop-blur transition hover:bg-white hover:scale-105"
      >
        Next →
      </button>

    </div>

    {/* Destination cards */}
    <div className="grid gap-5 md:grid-cols-3">

      {explorePages[explorePage].map((place) => (
        <DestinationCard
          key={place.name}
          place={place}
          label="Explore"
        />
      ))}

    </div>

    {/* Carousel controls */}
    <div className="relative mt-5 flex items-center justify-center">

      {/* Dots */}
      <div className="flex items-center gap-2">

        {explorePages.map((_, index) => (
          <button
            key={index}
            onClick={() => setExplorePage(index)}
            aria-label={`Go to Explore page ${index + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              explorePage === index
                ? 'w-5 bg-orange-500'
                : 'w-2.5 bg-orange-200 hover:bg-orange-300'
            }`}
          />
        ))}

      </div>

      {/* Next arrow */}
      <button
        onClick={nextExplorePage}
        aria-label="Next destinations"
        className="absolute right-0 flex h-11 w-11 items-center justify-center rounded-full bg-white text-2xl font-bold text-[#07184a] shadow-md transition hover:scale-110"
      >
        →
      </button>

    </div>

  </div>

</section>
          </>
        )}

      </main>

      {/* =====================================================
          CALL TO ACTION
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#17236b] px-6 py-10 text-white">

        {/* Decorative circles */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -left-10 top-0 h-40 w-40 rounded-full border border-white" />
          <div className="absolute -left-20 top-10 h-56 w-56 rounded-full border border-white" />
          <div className="absolute -left-32 top-20 h-72 w-72 rounded-full border border-white" />
        </div>

        <div className="relative mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-6 md:flex-row">

          <div>
            <h2 className="text-2xl font-extrabold md:text-3xl">
              Plan Your Next Adventure
            </h2>

            <p className="mt-1 text-sm text-blue-100">
              Let AI craft the perfect itinerary for you.
            </p>
          </div>

          <button
            onClick={handleAiClick}
            className="rounded-full bg-gradient-to-r from-violet-600 to-blue-500 px-7 py-3 font-bold shadow-lg transition hover:scale-105"
          >
            ✨ Plan with AI
          </button>

        </div>
      </section>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="relative overflow-hidden bg-[#10182f] px-6 py-5 text-white">

  {/* Curved top edge */}
  <div className="absolute -top-10 left-[-5%] h-20 w-[110%] rounded-[50%] bg-[#10182f]" />

  <div className="relative z-10 mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-4 pt-2 md:flex-row">

    {/* Brand */}
    <div className="flex items-center gap-3 text-sm font-semibold">
      <span className="text-xl">✈️</span>
      <span>AI Travel Planner</span>
    </div>

    {/* Center text */}
    <div className="text-xs text-blue-200 md:text-sm">
      Explore India
      <span className="mx-2">•</span>
      Travel Smarter
      <span className="mx-2">•</span>
      Create Memories
    </div>

    {/* Social icons */}
    <div className="flex items-center gap-2">

      <a
        href="#"
        aria-label="GitHub"
        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1d2948] text-xs font-bold transition hover:bg-blue-600"
      >
        GH
      </a>

      <a
        href="#"
        aria-label="LinkedIn"
        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1d2948] text-xs font-bold transition hover:bg-blue-600"
      >
        in
      </a>

      <a
        href="#"
        aria-label="Twitter"
        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1d2948] text-xs font-bold transition hover:bg-blue-600"
      >
        X
      </a>

      <a
        href="#"
        aria-label="Instagram"
        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1d2948] text-xs font-bold transition hover:bg-blue-600"
      >
        IG
      </a>

    </div>

  </div>

</footer>
    </div>
  );
}

export default HomePage;