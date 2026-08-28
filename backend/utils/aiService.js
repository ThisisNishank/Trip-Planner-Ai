const { GoogleGenAI } = require('@google/genai');

const generateItinerary = async (destination, weather, days, people, budget) => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const prompt = `
You are a travel planning assistant. Create a personalized day-by-day itinerary for a trip to ${destination.name}, ${destination.state}, India.

Trip details:
- Duration: ${days} days
- Number of people: ${people}
- Budget: ₹${budget} total
- Current weather: ${weather.condition}, ${weather.temperature}

Destination info to use:
- Attractions: ${destination.attractions.map(a => a.name).join(', ')}
- Nearest airport: ${destination.nearestAirport}
- Nearest railway station: ${destination.nearestRailwayStation}
- Hotel options: ${destination.hotels.map(h => `${h.name} (${h.priceRange}, ₹${h.pricePerNight}/night)`).join(', ')}

Write a friendly, practical day-by-day plan. For each day, suggest which attractions to visit and roughly when. Recommend one hotel that best fits the given budget. Keep it concise and realistic given the trip duration.
`;

  const response = await ai.models.generateContent({
  model: 'gemini-3.6-flash', 
  contents: prompt,
});

  return response.text;
};

module.exports = { generateItinerary };