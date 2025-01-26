const express = require('express');
const { Op } = require('sequelize');
const Video = require('../models/video');
const router = express.Router();

// Fetch paginated videos
router.get('/videos', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const videos = await Video.findAll({
      order: [['published_at', 'DESC']],
      limit: parseInt(limit),
      offset: (page - 1) * limit,
    });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching videos' });
  }
});

// Search videos by title or description
router.get('/videos/search', async (req, res) => {
  const { query } = req.query;
  try {
    const videos = await Video.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${query}%` } },
          { description: { [Op.iLike]: `%${query}%` } },
        ],
      },
    });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: 'Error searching videos' });
  }
});

module.exports = router;