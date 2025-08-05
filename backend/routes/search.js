const express = require('express');
const db = require('../db');
const { authenticateToken } = require('./auth');
const router = express.Router();

// POST /api/search - Save a user’s search to DB
router.post('/', authenticateToken, async (req, res) => {
  const { origin, destination, date } = req.body;

  if (!origin || !destination || !date) {
    return res.status(400).json({ error: 'Missing required fields: origin, destination, or date.' });
  }

  try {
    const search = db.search.create({
      userId: req.user.userId,
      origin,
      destination,
      date,
    });

    res.status(201).json({ search });
  } catch (err) {
    console.error("❌ Error saving search:", err);
    res.status(500).json({ error: 'Failed to save search.' });
  }
});

// GET /api/search - List user's previous searches
router.get('/', authenticateToken, async (req, res) => {
  try {
    const searches = db.search.findMany({ userId: req.user.userId });
    res.json({ searches });
  } catch (err) {
    console.error("❌ Error retrieving searches:", err);
    res.status(500).json({ error: 'Failed to retrieve searches.' });
  }
});

module.exports = router;
