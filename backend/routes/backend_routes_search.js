const express = require('express');
const db = require('../db');
const { authenticateToken } = require('./auth');
const router = express.Router();

// POST /api/search - Save or run a search
router.post('/', authenticateToken, async (req, res) => {
  const { origin, destination, date } = req.body;
  if (!origin || !destination || !date) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  // Save search to database (implement db.search.create for SQLite)
  const search = db.search.create({
    userId: req.user.userId,
    origin,
    destination,
    date,
  });
  // Optionally, call external flight API here and return results
  res.status(201).json({ search });
});

// GET /api/search - List previous searches for user
router.get('/', authenticateToken, async (req, res) => {
  const searches = db.search.findMany({ userId: req.user.userId });
  res.json({ searches });
});

module.exports = router;