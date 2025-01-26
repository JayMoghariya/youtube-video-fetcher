const express = require('express');
const videoRoutes = require('./routes/videoRoutes');
const sequelize = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', videoRoutes);

require('./utils/cronJob');

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
    await sequelize.sync();
    app.listen(3000, () => {
      console.log('Server running on http://localhost:3000');
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

startServer();