import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import api from '../api/axios';
import { getImageSearchTerm } from '../utils/destinationImageQueries';

function AttractionPage() {
  const [searchParams] = useSearchParams();
  const destinationName = searchParams.get('destination');
  const attractionName = searchParams.get('name');
  const navigate = useNavigate();

  const [heroImage, setHeroImage] = useState('');
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const searchTerm = encodeURIComponent(getImageSearchTerm(attractionName));
        const wikiRes = await axios.get(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${searchTerm}`
        );
        const url = wikiRes.data.originalimage?.source || wikiRes.data.thumbnail?.source;
        if (url) setHeroImage(url);
      } catch {
        // no image found, page still works without one
      }

      try {
        const res = await api.get(
          `/attractions/${encodeURIComponent(destinationName)}/${encodeURIComponent(attractionName)}`
        );
        setInfo(res.data.info);
      } catch {
        setInfo('Sorry, we could not load information about this place right now.');
      }

      setLoading(false);
    };

    fetchData();
  }, [destinationName, attractionName]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading {attractionName}...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative w-full h-80 sm:h-[28rem] overflow-hidden">
        {heroImage ? (
          <img src={heroImage} alt={attractionName} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-blue-600" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
        <div className="absolute bottom-6 left-0 right-0 max-w-3xl mx-auto px-4">
          <button
            onClick={() => navigate(-1)}
            className="text-white/90 text-sm mb-3 hover:text-white hover:underline transition"
          >
            ← Back to {destinationName}
          </button>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
            {attractionName}
          </h1>
          <p className="text-white/90 text-lg mt-1">{destinationName}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 prose prose-sm sm:prose-base prose-headings:text-blue-700 prose-headings:font-bold prose-strong:text-gray-800 max-w-none">
          <ReactMarkdown>{info}</ReactMarkdown>
        </div>

        <Link
          to={`/itinerary?destination=${destinationName}`}
          className="inline-block mt-6 text-blue-600 hover:underline text-sm"
        >
          ← Back to {destinationName} overview
        </Link>
      </div>
    </div>
  );
}

export default AttractionPage;