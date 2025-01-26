const axios = require('axios');
require('dotenv').config();

const YOUTUBE_API_KEYS = process.env.YOUTUBE_API_KEYS.split(',');
let apiKeyIndex = 0;

const getNextApiKey = () => {
  const apiKey = YOUTUBE_API_KEYS[apiKeyIndex];
  apiKeyIndex = (apiKeyIndex + 1) % YOUTUBE_API_KEYS.length;
  return apiKey;
};

const fetchLatestVideos = async (searchQuery) => {
  const apiKey = getNextApiKey();
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${searchQuery}&order=date&maxResults=10&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    return response.data.items.map(item => {
      const { videoId } = item.id;
      const { title, description, publishedAt, channelTitle, thumbnails, liveBroadcastContent } = item.snippet;
      return {
        video_id: videoId,
        title,
        description,
        published_at: new Date(publishedAt),
        channel_title: channelTitle,
        live_broadcast_content: liveBroadcastContent,
        thumbnail_url: thumbnails?.default?.url,
        thumbnails,
      };
    });
  } catch (error) {
    console.error('Error fetching YouTube data:', error);
    return [];
  }
};

module.exports = { fetchLatestVideos };