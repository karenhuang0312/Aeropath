const express = require('express');
const axios = require('axios');
const router = express.Router();

const KIWI_API_KEY = process.env.KIWI_API_KEY;

// Helper: Map Kiwi flight data to frontend contract
function mapKiwiFlights(data) {
  return data.map((flight, i) => ({
    id: flight.id || `flight-${i}`,
    origin: flight.cityFrom,
    destination: flight.cityTo,
    date: flight.local_departure.slice(0, 10), // YYYY-MM-DD
    airline: flight.airlines && flight.airlines[0],
    price: flight.price,
    link: flight.deep_link,
  }));
}

router.get('/', async (req, res) => {
  const { origin, destination, date, sort } = req.query;
  if (!origin || !destination || !date) {
    return res.status(400).json({ error: "Missing required query parameters" });
  }

  try {
    // Query Kiwi API
    const response = await axios.get('https://api.tequila.kiwi.com/v2/search', {
      headers: {
        apikey: KIWI_API_KEY,
      },
      params: {
        fly_from: origin,
        fly_to: destination,
        date_from: date,
        date_to: date,
        sort: sort === "price" ? "price" : "quality", // Kiwi supports price, quality, duration, etc.
        limit: 20,
        curr: "USD",
      },
    });

    const results = mapKiwiFlights(response.data.data);

    res.json(results);
  } catch (error) {
    console.error("Kiwi API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch flights" });
  }
});

module.exports = router;
