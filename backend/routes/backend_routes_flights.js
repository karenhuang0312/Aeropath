const express = require("express");
const axios = require("axios");
const router = express.Router();

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY; // Set in your .env

// GET /api/flights?origin=JFK&destination=CDG&date=2025-09-01
router.get("/", async (req, res) => {
  const { origin, destination, date } = req.query;
  if (!origin || !destination || !date) {
    return res.status(400).json({ error: "origin, destination, and date are required." });
  }

  try {
    const url = `https://aerodatabox.p.rapidapi.com/flights/airports/iata/${origin}/${date}T00:00/${date}T23:59`;
    const response = await axios.get(url, {
      params: { direction: "Departure" },
      headers: {
        "X-RapidAPI-Key": RAPIDAPI_KEY,
        "X-RapidAPI-Host": "aerodatabox.p.rapidapi.com",
      },
    });

    const departures = response.data.departures || [];
    // Filter flights arriving at the requested destination
    const flights = departures
      .filter((f) => f.arrival?.airport?.iata === destination)
      .map((f) => ({
        airline: f.airline?.name,
        flight_number: f.flightNumber,
        origin: f.departure?.airport?.iata,
        destination: f.arrival?.airport?.iata,
        departure_time: f.departure?.scheduledTimeLocal,
        arrival_time: f.arrival?.scheduledTimeLocal,
        status: f.status,
        // No price info available from AeroDataBox
      }));

    res.json(flights);
  } catch (error) {
    console.error(error?.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch flights from AeroDataBox." });
  }
});

module.exports = router;