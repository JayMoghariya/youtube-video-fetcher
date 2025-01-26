const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Video = sequelize.define('Video', {
  video_id: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  published_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  thumbnail_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  channel_title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  live_broadcast_content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // For thumbnails, you can store them as a JSON object.
  thumbnails: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
}, {
  indexes: [
    {
      fields: ['published_at'],
      order: 'DESC',
    },
  ],
});

module.exports = Video;