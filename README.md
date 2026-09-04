# 🧳 AI Travel Planner

A full-stack MERN application that helps travelers explore India's most iconic destinations and get a personalized, AI-generated itinerary in seconds — built from scratch, end to end, including authentication, a live weather integration, and a Gemini-powered planning engine.

**🔗 Live site:** [trip-planner-ai-fawn-nine.vercel.app](https://trip-planner-ai-fawn-nine.vercel.app/)
**⚙️ Live API:** [trip-planner-ai-2e2b.onrender.com](https://trip-planner-ai-2e2b.onrender.com)

---

## 💡 The idea

Planning a trip usually means fifteen browser tabs open at once — one for hotels, one for weather, one for "top things to do," another for figuring out how to actually get there. AI Travel Planner puts all of that in one place: pick a destination, tell it your budget, your group size, and how many days you have, and it builds a complete, practical itinerary around real data — not a generic template.

## ✨ Features

- 🔐 **Secure authentication** — signup/login with hashed passwords (bcrypt) and JWT-based sessions
- 🗺️ **15 curated Indian destinations** — Goa, Manali, Jaipur, Kashmir, and more, each with real attractions, hotels, and travel info
- 🌤️ **Live weather** — real-time conditions pulled per destination, with caching to stay fast and reliable
- 🤖 **AI-generated itineraries** — a day-by-day plan built by Google's Gemini API, using the destination's real data, live weather, and the user's budget/group size as context
- 📍 **120+ individually written attraction pages** — each with history, best time to visit, nearby spots, and local food, complete with its own photo
- 🌗 **Light/dark mode**, smooth hover animations, and a fully responsive layout
- 🖼️ Dynamic destination and attraction photos, fetched and disambiguated automatically

## 🛠️ Tech stack

**Frontend:** React (Vite), React Router, Tailwind CSS, Axios
**Backend:** Node.js, Express
**Database:** MongoDB (Atlas)
**AI:** Google Gemini API (`gemini-3.1-flash-lite`)
**Weather:** Open-Meteo API
**Auth:** JWT + bcrypt
**Deployment:** Vercel (frontend) · Render (backend)

## 🧠 How it works

1. A user signs up or logs in — the backend hashes their password and issues a JWT
2. They browse or search a destination — the frontend pulls real data from MongoDB via a REST API
3. Live weather is fetched (and cached server-side) for that destination
4. When they ask for an AI plan, the backend combines the destination's data, current weather, and the user's trip details into a single prompt sent to Gemini, which returns a genuinely personalized itinerary
5. Every request that should require login (like generating an itinerary) is protected by custom Express middleware that verifies the JWT before letting the request through

## 📁 Project structure
ai-travel-planner/
├── backend/
│ ├── config/ # database connection
│ ├── controllers/ # request-handling logic
│ ├── data/ # hand-written attraction content
│ ├── middleware/ # JWT auth protection
│ ├── models/ # Mongoose schemas
│ ├── routes/ # API route definitions
│ └── utils/ # weather + AI service helpers
└── frontend/
└── src/
├── api/ # axios instance
├── components/ # reusable UI pieces
├── hooks/ # custom React hooks (theme, etc.)
├── pages/ # route-level pages
└── utils/ # image-fetching helpers


## 🚀 Running it locally

**Backend**

cd backend
npm install
npm run dev

Create a `.env` file in `backend/` with:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_api_key


**Frontend**

cd frontend
npm install
npm run dev

Create a `.env` file in `frontend/` with:
VITE_API_URL=http://localhost:5000/api


## 🌱 What I'd add next

- Favorites/wishlist for saved destinations
- User-editable trip itineraries (not just AI-generated)
- More destinations and regional cuisines
- Integration with real hotel/flight booking APIs

## 👋 About this project

Built as a hands-on way to learn the full MERN stack properly — not just tutorials, but a genuinely working, deployed product with real authentication, a real database, real third-party API integrations, and real deployment. Every feature here was built, debugged, and shipped from scratch.