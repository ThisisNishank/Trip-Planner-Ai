import { Link } from 'react-router-dom';

function ExplorePage() {
  const destinations = [
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
    {
      name: 'Srinagar',
      state: 'Jammu and Kashmir',
      image: '/images/srinagar.jpg',
    },
    {
      name: 'Khajuraho',
      state: 'Madhya Pradesh',
      image: '/images/khajuraho.jpg',
    },
    {
      name: 'Andaman Islands',
      state: 'Andaman and Nicobar Islands',
      image: '/images/andaman.jpg',
    },
  ];

  return (
    <div className="min-h-screen bg-[#fff5df] px-6 py-10">

      {/* Header */}
      <div className="mx-auto mb-10 max-w-[1100px]">
        <Link
          to="/"
          className="text-sm font-semibold text-blue-600 hover:underline"
        >
          ← Back to Home
        </Link>

        <p className="mt-8 text-sm font-bold tracking-[4px] text-orange-600">
          EXPLORE INDIA
        </p>

        <h1 className="mt-2 text-5xl font-black text-[#07184a]">
          Explore India
        </h1>

        <p className="mt-3 text-lg text-[#6b4b2a]">
          Discover incredible places waiting to be explored.
        </p>
      </div>

      {/* Destination Grid */}
      <div className="mx-auto grid max-w-[1100px] gap-6 sm:grid-cols-2 lg:grid-cols-3">

        {destinations.map((place) => (
          <Link
            key={place.name}
            to={`/itinerary?destination=${place.name}`}
            className="group relative h-[250px] overflow-hidden rounded-[20px] shadow-lg"
          >
            <img
              src={place.image}
              alt={place.name}
              className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-900 shadow">
              Explore
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <div>
                <h2 className="text-2xl font-extrabold text-white drop-shadow-lg">
                  {place.name}
                </h2>

                <p className="mt-1 text-sm font-medium text-white">
                  📍 {place.state}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-2xl text-white backdrop-blur-md transition group-hover:bg-white group-hover:text-blue-600">
                →
              </div>
            </div>
          </Link>
        ))}

      </div>

    </div>
  );
}

export default ExplorePage;