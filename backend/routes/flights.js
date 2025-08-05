const express = require('express');
const axios = require('axios');
const router = express.Router();

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

if (!RAPIDAPI_KEY) {
  console.warn("⚠️ RAPIDAPI_KEY is not set in environment variables.");
}

// Helper: Format AeroDataBox data
function mapAeroFlights(data) {
  return data.departures.map((flight, i) => ({
    id: `flight-${i}`,
    origin: flight.departure?.airport?.icao || "Unknown",
    destination: flight.arrival?.airport?.icao || "Unknown",
    date: flight.departure?.scheduledTimeLocal || "N/A",
    airline: flight.airline?.name || "Unknown",
    flightNumber: flight.flight?.number,
    status: flight.status || "N/A",
  }));
}

// Example endpoint: /api/flights?origin=JFK&destination=CDG&date=2025-09-01
router.get('/', async (req, res) => {
  const { origin, destination, date } = req.query;

  if (!origin || !destination || !date) {
    return res.status(400).json({ error: 'Missing origin, destination, or date' });
  }

  try {
    const response = await axios.get(`https://aerodatabox.p.rapidapi.com/flights/airports/icao/${origin}/${date}`, {
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'aerodatabox.p.rapidapi.com',
      },
      params: {
        direction: 'Departure',
        withLeg: 'false',
        withCancelled: 'false',
        withCodeshared: 'false',
        withCargo: 'false',
        withPrivate: 'false',
      }
    });

    const results = mapAeroFlights(response.data).filter(
      (f) => f.destination === destination
    );

    res.json(results);
  } catch (error) {
    console.error("❌ AeroDataBox API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch flights from AeroDataBox API." });
  }
});

module.exports = router;
