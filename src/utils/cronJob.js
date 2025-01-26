const cron = require('node-cron');
const { fetchLatestVideos } = require('../services/youtubeService');
const Video = require('../models/video');

// Function to fetch and save videos
const fetchAndSaveVideos = async () => {
    console.log("fetchAndSaveVideos invoked....");
  const searchQuery = 'cricket';  // Example query
  const videos = await fetchLatestVideos(searchQuery);

  for (const video of videos) {
    try {
      await Video.create(video);
    } catch (error) {
      console.error('Error saving video:', error);
    }
  }
};

// Schedule the task every 50 seconds
cron.schedule('*/50 * * * * *', fetchAndSaveVideos);
console.log('Cron job scheduled');