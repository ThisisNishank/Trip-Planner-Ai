import { useState } from 'react';

const quotes = [
  "The world is a book, and those who do not travel read only one page.",
  "Travel far enough, you meet yourself.",
  "Not all who wander are lost.",
  "A journey is best measured in friends, not miles.",
  "Once a year, go someplace you've never been before.",
];

function Stepper({ icon, iconBg, iconColor, glowColor, label, value, onChange, step, prefix }) {
  const applyGlow = (e, intensity) => {
    e.currentTarget.style.background = iconBg;
    e.currentTarget.style.borderColor = iconColor;
    e.currentTarget.style.boxShadow = `0 0 0 2px ${iconColor}, 0 0 ${intensity}px ${intensity / 2}px ${glowColor}`;
  };

  const removeGlow = (e) => {
    e.currentTarget.style.background = '';
    e.currentTarget.style.borderColor = '#f3f4f6';
    e.currentTarget.style.boxShadow = 'none';
  };

  const handleDecrease = () => {
    const current = value === '' ? step : Number(value);
    onChange(Math.max(1, current - step));
  };

  const handleIncrease = () => {
    const current = value === '' ? 0 : Number(value);
    onChange(current + step);
  };

  return (
    <div
      className="flex items-center gap-3.5 bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 transition-all duration-200 cursor-pointer"
      onMouseEnter={(e) => applyGlow(e, 22)}
      onMouseLeave={removeGlow}
      onMouseDown={(e) => applyGlow(e, 34)}
      onMouseUp={(e) => applyGlow(e, 22)}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: iconBg, color: iconColor }}
      >
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-xs text-gray-400 mb-0.5">{label}</p>
        <div className="flex items-center gap-0.5">
          {prefix && <span className="text-[15px] font-medium text-gray-800">{prefix}</span>}
          <input
            type="number"
            value={value}
            placeholder="0"
            onChange={(e) => {
              const val = e.target.value;
              if (val === '') {
                onChange('');
                return;
              }
              const num = Number(val);
              onChange(num < 1 ? 1 : num);
            }}
            onClick={(e) => e.stopPropagation()}
            min="1"
            className="text-[15px] font-medium text-gray-800 bg-transparent border-none outline-none w-full placeholder:text-gray-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleDecrease}
          className="w-9 h-9 rounded-lg border-2 border-gray-200 bg-white text-gray-600 text-lg font-semibold flex items-center justify-center hover:bg-gray-100 hover:border-gray-300 active:scale-90 transition-all"
        >
          −
        </button>
        <button
          type="button"
          onClick={handleIncrease}
          className="w-9 h-9 rounded-lg border-2 border-gray-200 bg-white text-gray-600 text-lg font-semibold flex items-center justify-center hover:bg-gray-100 hover:border-gray-300 active:scale-90 transition-all"
        >
          +
        </button>
      </div>
    </div>
  );
}
function TripPlannerModal({ destinationName, heroImage, onClose, onGenerate, generating }) {
  const [quote] = useState(() => quotes[Math.floor(Math.random() * quotes.length)]);
  const [days, setDays] = useState('');
  const [people, setPeople] = useState('');
  const [budget, setBudget] = useState('');

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-cover bg-center"
      style={heroImage ? { backgroundImage: `url(${heroImage})` } : { background: '#1e293b' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/75 to-blue-950/55" />

      <div className="relative bg-white rounded-[28px] w-full max-w-md p-8 shadow-2xl overflow-hidden">
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-14 w-56 h-56 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 text-xs font-medium px-3 py-1.5 rounded-full">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              {destinationName}, India
            </span>
            <button
              onClick={onClose}
              aria-label="Close"
              className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200 transition"
            >
              ✕
            </button>
          </div>

          <p className="italic text-sm text-gray-500 mb-2.5 leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
            "{quote}"
          </p>

          <h3 className="text-[22px] font-bold text-gray-800 leading-tight mb-1">
            Let's write your {destinationName} chapter
          </h3>
          <p className="text-sm text-gray-500 mb-6">A few details and your itinerary is ready</p>

          <div className="flex flex-col gap-3">
            <Stepper
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>}
              iconBg="#eff6ff"
              iconColor="#2563eb"
              glowColor="rgba(37,99,235,0.18)"
              label="Trip length"
              value={days}
              onChange={setDays}
              step={1}
            />
            <Stepper
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
              iconBg="#eef2ff"
              iconColor="#4f46e5"
              glowColor="rgba(79,70,229,0.18)"
              label="Travelers"
              value={people}
              onChange={setPeople}
              step={1}
            />
            <Stepper
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 3h12M6 8h12M6 13l8.5 8M6 13h3M11 13h5"/></svg>}
              iconBg="#ecfdf5"
              iconColor="#059669"
              glowColor="rgba(5,150,105,0.18)"
              label="Total budget"
              value={budget}
              onChange={setBudget}
              step={1000}
              prefix="₹"
            />
          </div>

            <button
            onClick={() => onGenerate(days, people, budget)}
            disabled={generating || !days || !people || !budget}
            className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-full h-[46px] text-[15px] font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-150 disabled:opacity-50"
          >
            {generating ? 'Generating your plan...' : (
              <>
                Generate itinerary
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </>
            )}
          </button>

          <p className="text-center text-xs text-gray-400 mt-3.5">Powered by AI · Personalized to your trip</p>
        </div>
      </div>
    </div>
  );
}

export default TripPlannerModal;