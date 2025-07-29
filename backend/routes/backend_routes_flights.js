const express = require('express');
const axios = require('axios');
const router = express.Router();

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

// Example: GET /api/flights?origin=JFK&destination=CDG&date=2025-09-01&sort=price
router.get('/', async (req, res) => {
  const { origin, destination, date, sort = 'price' } = req.query;

  if (!origin || !destination || !date) {
    return res.status(400).json({ error: "origin, destination, and date are required." });
  }

  try {
    const response = await axios.get('https://kiwi-com-cheap-flights.p.rapidapi.com/cheapflights', {
      params: {
        origin,        // e.g., "JFK"
        destination,   // e.g., "CDG"
        depart_date: date, // e.g., "2025-09-01"
        currency: "USD",
        sort
      },
      headers: {
        "X-RapidAPI-Key": RAPIDAPI_KEY,
        "X-RapidAPI-Host": "kiwi-com-cheap-flights.p.rapidapi.com"
      }
    });

    // The API returns data in response.data.data
    const flights = (response.data.data || []).map(f => ({
      id: f.id || `${f.airlines}-${f.flight_number}-${f.departure_at}`,
      airline: f.airlines,
      flight_number: f.flight_number,
      origin: f.origin,
      destination: f.destination,
      departure_time: f.departure_at,
      arrival_time: f.arrival_at,
      price: f.price,
      link: f.deep_link || f.booking_link || "#"
    }));

    res.json(flights);
  } catch (error) {
    console.error(error?.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch flights from Kiwi API." });
  }
});

module.exports = router;
