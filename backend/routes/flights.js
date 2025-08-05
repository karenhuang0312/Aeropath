const express = require('express');
const axios = require('axios');
const router = express.Router();

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

if (!RAPIDAPI_KEY) {
  console.warn("⚠️ RAPIDAPI_KEY is not set in environment variables.");
}

// Helper to format AeroDataBox flight data
function mapAeroFlights(data) {
  return data.departures.map((flight, i) => ({
    id: flight.number || `flight-${i}`,
    origin: flight.departure.airport.icao || "N/A",
    destination: flight.arrival.airport.icao || "N/A",
    date: flight.departure.scheduledTimeLocal?.split('T')[0] || "N/A",
    airline: flight.airline.name || "Unknown",
    price: Math.floor(Math.random() * 300) + 200, // Placeholder price
    link: `https://www.${flight.airline.name?.toLowerCase().replace(/\s/g, '')}.com/` || "#",
  }));
}

// GET /api/flights?origin=JFK&destination=CDG&date=2025-09-01
router.get('/', async (req, res) => {
  const { origin, destination, date } = req.query;

  if (!origin || !destination || !date) {
    return res.status(400).json({ error: "Missing origin, destination, or date" });
  }

  try {
    const response = await axios.get(`https://aerodatabox.p.rapidapi.com/flights/airports/icao/${origin}/${date}`, {
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'aerodatabox.p.rapidapi.com',
      },
      params: {
        direction: 'Departure',
        withLeg: false,
      },
    });

    const allFlights = response.data;
    const filtered = allFlights.departures.filter(
      (flight) => flight.arrival?.airport?.icao === destination
    );

    res.json(mapAeroFlights({ departures: filtered }));
  } catch (error) {
    console.error("❌ AeroDataBox API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch flights from AeroDataBox." });
  }
});

module.exports = router;
