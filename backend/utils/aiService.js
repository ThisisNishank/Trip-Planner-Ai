const { GoogleGenAI } = require('@google/genai');

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const callGeminiWithRetry = async (ai, params, retries = 2) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await ai.models.generateContent(params);
    } catch (error) {
      const message = error.message || '';
      const isQuotaExhausted = message.includes('429') || message.includes('RESOURCE_EXHAUSTED') || message.includes('quota');
      const isOverloaded = message.includes('503') || message.includes('UNAVAILABLE');

      if (isQuotaExhausted) {
        error.isQuotaExhausted = true;
        throw error; // never retry — it will fail the same way and waste quota
      }

      if (isOverloaded && attempt < retries) {
        await wait(attempt * 2500);
        continue;
      }

      throw error;
    }
  }
};

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

  const response = await callGeminiWithRetry(ai, {
    model: 'gemini-3.1-flash-lite',
    contents: prompt,
  });

  return response.text;
};

const generateAttractionInfo = async (attractionName, destinationName) => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const prompt = `
You are a knowledgeable local travel guide with a good travel experience. Write an engaging overview of "${attractionName}", located in ${destinationName}, India.

Structure your response with these markdown headings:
## History & Background
A short, interesting history (2-3 sentences).

## Why Visit
What makes it worth seeing today (2-3 sentences).

## Best Time to Visit
One short line.

## Nearby Attractions
2-3 other famous places worth visiting nearby (bullet list, just names with a few words each).

## Local Food to Try
2-3 famous local dishes or food spots nearby (bullet list).

Keep the tone friendly and concise. Do not exceed 250 words total.
`;

  const response = await callGeminiWithRetry(ai, {
    model: 'gemini-3.1-flash-lite',
    contents: prompt,
  });

  return response.text;
};

module.exports = { generateItinerary, generateAttractionInfo };