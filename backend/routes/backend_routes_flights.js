const express = require('express');
const axios = require('axios');
const router = express.Router();

const KIWI_API_KEY = process.env.KIWI_API_KEY;

if (!KIWI_API_KEY) {
  console.warn("⚠️ KIWI_API_KEY is not set in environment variables.");
}

// Helper: Map Kiwi flight data to frontend format
function mapKiwiFlights(data) {
  return data.map((flight, i) => ({
    id: flight.id || `flight-${i}`,
    origin: flight.cityFrom,
    destination: flight.cityTo,
    date: flight.local_departure?.slice(0, 10) || "N/A",
    airline: flight.airlines?.[0] || "Unknown",
    price: flight.price,
    link: flight.deep_link,
  }));
}

// Route: GET /api/flights?origin=JFK&destination=LAX&date=2025-08-10&sort=price
router.get('/', async (req, res) => {
  const { origin, destination, date, sort } = req.query;

  if (!origin || !destination || !date) {
    return res.status(400).json({ error: "Missing required query parameters: origin, destination, or date." });
  }

  if (!KIWI_API_KEY) {
    return res.status(500).json({ error: "KIWI_API_KEY not set in environment." });
  }

  try {
    const response = await axios.get('https://api.tequila.kiwi.com/v2/search', {
      headers: {
        apikey: KIWI_API_KEY,
      },
      params: {
        fly_from: origin,
        fly_to: destination,
        date_from: date,
        date_to: date,
        sort: sort === "price" ? "price" : "quality",
        limit: 20,
        curr: "USD",
      },
    });

    const results = mapKiwiFlights(response.data.data);
    res.json(results);
  } catch (error) {
    console.error("❌ Kiwi API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch flights from Kiwi API." });
  }
});

module.exports = router;
