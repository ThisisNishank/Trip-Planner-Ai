import { useState } from 'react';

const quotes = [
  "The world is a book, and those who do not travel read only one page.",
  "Travel far enough, you meet yourself.",
  "Not all who wander are lost.",
  "A journey is best measured in friends, not miles.",
  "Once a year, go someplace you've never been before.",
  "More days. More places. More memories.",
  "Travel smart. Experience more.",
  "Choose your crew. We'll shape the journey.",
  "Your adventure deserves a little more time.",
];

function Stepper({
  icon,
  iconBg,
  iconColor,
  glowColor,
  label,
  value,
  onChange,
  step,
  prefix,
}) {
  const applyGlow = (e, intensity) => {
    e.currentTarget.style.background = iconBg;
    e.currentTarget.style.borderColor = iconColor;
    e.currentTarget.style.boxShadow = `0 0 0 2px ${iconColor}, 0 0 ${intensity}px ${intensity / 2}px ${glowColor}`;
  };

  const removeGlow = (e) => {
    e.currentTarget.style.background = '';
    e.currentTarget.style.borderColor = '';
    e.currentTarget.style.boxShadow = '';
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
      className="
        group flex items-center gap-3.5
        bg-white/80 backdrop-blur-sm
        border border-slate-200/80
        rounded-2xl px-4 py-3
        transition-all duration-300
        hover:-translate-y-0.5
        hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)]
        cursor-pointer
      "
      onMouseEnter={(e) => applyGlow(e, 20)}
      onMouseLeave={removeGlow}
      onMouseDown={(e) => applyGlow(e, 30)}
      onMouseUp={(e) => applyGlow(e, 20)}
    >
      <div
        className="
          w-11 h-11 rounded-xl
          flex items-center justify-center
          flex-shrink-0
          transition-all duration-300
          group-hover:scale-105
        "
        style={{
          background: iconBg,
          color: iconColor,
        }}
      >
        {icon}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-slate-400 mb-1">
          {label}
        </p>

        <div className="flex items-center gap-1">
          {prefix && (
            <span className="text-[15px] font-semibold text-slate-800">
              {prefix}
            </span>
          )}

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
            className="
              text-[16px] font-semibold
              text-slate-800
              bg-transparent
              border-none outline-none
              w-full
              placeholder:text-slate-300
              [appearance:textfield]
              [&::-webkit-outer-spin-button]:appearance-none
              [&::-webkit-inner-spin-button]:appearance-none
            "
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleDecrease}
          className="
            w-9 h-9 rounded-xl
            border border-slate-200
            bg-white
            text-slate-500
            text-lg font-medium
            flex items-center justify-center
            hover:bg-slate-50
            hover:border-slate-300
            hover:text-slate-800
            active:scale-90
            transition-all duration-200
          "
        >
          −
        </button>

        <button
          type="button"
          onClick={handleIncrease}
          className="
            w-9 h-9 rounded-xl
            border border-slate-200
            bg-white
            text-slate-500
            text-lg font-medium
            flex items-center justify-center
            hover:bg-slate-50
            hover:border-slate-300
            hover:text-slate-800
            active:scale-90
            transition-all duration-200
          "
        >
          +
        </button>
      </div>
    </div>
  );
}

function TripPlannerModal({
  destinationName,
  heroImage,
  onClose,
  onGenerate,
  generating,
}) {
  const [quote] = useState(
    () => quotes[Math.floor(Math.random() * quotes.length)]
  );

  const [days, setDays] = useState('');
  const [people, setPeople] = useState('');
  const [budget, setBudget] = useState('');

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        p-5 sm:p-6
        bg-cover bg-center
        overflow-y-auto
      "
      style={
        heroImage
          ? { backgroundImage: `url(${heroImage})` }
          : { background: '#1e293b' }
      }
    >
      {/* Keep the existing background image and overlay unchanged */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/75 to-blue-950/55" />

      {/* Modal */}
      <div
        className="
          relative
          w-full max-w-md
          bg-gradient-to-br from-white via-white to-blue-50/70
          rounded-[30px]
          shadow-[0_30px_80px_rgba(15,23,42,0.35)]
          border border-white/80
          overflow-hidden

          animate-[modalEnter_0.55s_cubic-bezier(0.22,1,0.36,1)]
        "
      >
        {/* Decorative gradient glow */}
        <div
          className="
            absolute -top-24 -right-24
            w-64 h-64
            rounded-full
            bg-blue-400/15
            blur-3xl
            animate-pulse
          "
        />

        <div
          className="
            absolute -bottom-28 -left-24
            w-72 h-72
            rounded-full
            bg-indigo-400/15
            blur-3xl
          "
        />

        {/* Small decorative line */}
        <div
          className="
            absolute top-0 left-1/2 -translate-x-1/2
            w-28 h-1
            rounded-full
            bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500
          "
        />

        <div className="relative p-7 sm:p-8">

          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <span
              className="
                inline-flex items-center gap-2
                bg-blue-50
                border border-blue-100
                text-blue-600
                text-xs font-semibold
                px-3.5 py-2
                rounded-full
                shadow-sm
              "
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>

              {destinationName}, India
            </span>

            <button
              onClick={onClose}
              aria-label="Close"
              className="
                w-9 h-9
                rounded-full
                bg-slate-50
                border border-slate-200
                text-slate-400
                flex items-center justify-center

                hover:bg-white
                hover:text-slate-700
                hover:rotate-90
                hover:shadow-md

                transition-all duration-300
              "
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          {/* Quote */}
          <div className="mb-4">
            <div className="w-8 h-[2px] bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mb-3" />

            <p
              className="
                italic
                text-[15px]
                text-slate-500
                leading-7
              "
              style={{ fontFamily: 'Georgia, serif' }}
            >
              "{quote}"
            </p>
          </div>

          {/* Heading */}
          <div className="mb-6">
            <h3
              className="
                text-[25px]
                font-bold
                tracking-[-0.5px]
                text-slate-900
                leading-tight
              "
            >
              Let's write your {destinationName} chapter
            </h3>

            <p className="text-sm text-slate-500 mt-1.5">
              A few details and your journey takes shape
            </p>
          </div>

          {/* Inputs */}
          <div className="flex flex-col gap-3.5">

            <Stepper
              icon={
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
              }
              iconBg="#eff6ff"
              iconColor="#2563eb"
              glowColor="rgba(37,99,235,0.18)"
              label="Set the days, shape the journey"
              value={days}
              onChange={setDays}
              step={1}
            />

            <Stepper
              icon={
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              }
              iconBg="#eef2ff"
              iconColor="#4f46e5"
              glowColor="rgba(79,70,229,0.18)"
              label="Choose your travel crew"
              value={people}
              onChange={setPeople}
              step={1}
            />

            <Stepper
              icon={
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 3h12M6 8h12M6 13l8.5 8M6 13h3M11 13h5" />
                </svg>
              }
              iconBg="#ecfdf5"
              iconColor="#059669"
              glowColor="rgba(5,150,105,0.18)"
              label="Set your travel budget"
              value={budget}
              onChange={setBudget}
              step={1000}
              prefix="₹"
            />
          </div>

          {/* Generate button */}
          <button
            onClick={() => onGenerate(days, people, budget)}
            disabled={generating || !days || !people || !budget}
            className="
              relative
              overflow-hidden
              w-full
              mt-6
              h-[50px]
              rounded-full

              bg-gradient-to-r
              from-indigo-600
              via-blue-600
              to-blue-500

              text-white
              text-[15px]
              font-semibold

              flex items-center justify-center gap-2

              shadow-[0_10px_25px_rgba(37,99,235,0.25)]

              hover:shadow-[0_14px_30px_rgba(37,99,235,0.35)]
              hover:-translate-y-0.5

              active:scale-[0.98]

              transition-all duration-300

              disabled:opacity-50
              disabled:cursor-not-allowed
              disabled:hover:translate-y-0
              disabled:hover:shadow-[0_10px_25px_rgba(37,99,235,0.25)]
            "
          >
            {/* Button shine */}
            {!generating && (
              <span
                className="
                  absolute inset-0
                  -translate-x-full
                  hover:translate-x-full
                  bg-gradient-to-r
                  from-transparent
                  via-white/20
                  to-transparent
                  transition-transform duration-700
                "
              />
            )}

            <span className="relative">
              {generating ? 'Creating your journey...' : 'Generate itinerary'}
            </span>

            {!generating && (
              <svg
                className="relative transition-transform duration-300 group-hover:translate-x-1"
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            )}

            {generating && (
              <span
                className="
                  relative
                  w-4 h-4
                  border-2
                  border-white/40
                  border-t-white
                  rounded-full
                  animate-spin
                "
              />
            )}
          </button>

          {/* Footer copy */}
          <p
            className="
              text-center
              text-xs
              text-slate-400
              mt-4
              tracking-wide
            "
          >
            Powered by AI · Personalized to your trip
          </p>
        </div>
      </div>

      {/* Modal animation */}
      <style>
        {`
          @keyframes modalEnter {
            0% {
              opacity: 0;
              transform: translateY(28px) scale(0.96);
            }

            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}
      </style>
    </div>
  );
}

export default TripPlannerModal;