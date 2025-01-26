
# YouTube Video Fetcher API

This project implements a backend API that fetches the latest videos from YouTube based on a search query, stores them in a PostgreSQL database, and exposes endpoints to retrieve and search for these videos. It also supports paginated responses and performs searches based on partial matches in video titles and descriptions.

## Features
- Fetches the latest videos from YouTube using the YouTube Data API v3.
- Stores video details in a PostgreSQL database.
- Exposes RESTful APIs for:
  - Fetching paginated video data sorted by the published date.
  - Searching videos by title or description.
- Dockerized for easy deployment.
- Supports multiple API keys for YouTube API to handle quota limits.
- Optimized search to find partial matches in video titles and descriptions.

## Prerequisites
- Node.js (v16 or higher)
- Docker (for containerization)

## Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/youtube-video-fetcher.git
cd youtube-video-fetcher
```

### 2. Set up environment variables
Create a `.env` file in the root directory of the project with the following content:
```
YOUTUBE_API_KEYS=YOUR_YOUTUBE_API_KEY_1,YOUR_YOUTUBE_API_KEY_2
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASS=your_db_password
DB_NAME=videos_db
```
Replace the placeholders with actual values. You can add multiple YouTube API keys, separated by commas, to handle quota exhaustion.

### 3. Install dependencies
Run the following command to install the required dependencies:
```bash
npm install
```

### 4. Set up the database
Run the following command to set up the PostgreSQL database:
```bash
npm run migrate
```

### 5. Start the application
To start the application, run the following command:
```bash
npm start
```

This will run the server on `http://localhost:3000`.

### 6. Docker Setup
If you prefer to run the project in Docker, follow these steps:

- Run and build the application with Docker Compose:
  ```bash
  docker-compose up --build
  ```

The application will be available at `http://localhost:3000`.

## API Endpoints

### 1. Fetch Paginated Videos
**Endpoint**: `GET /api/videos`

**Query Parameters**:
- `page`: The page number (default: 1).
- `limit`: The number of videos per page (default: 10).

Example:
```bash
GET http://localhost:3000/api/videos?page=1&limit=10
```

### 2. Search Videos
**Endpoint**: `GET /api/videos/search`

**Query Parameters**:
- `query`: The search query to find videos by title or description.

Example:
```bash
GET http://localhost:3000/api/videos/search?query=cricket
```

## Development

### Running Tests
You can add unit tests and run them using a testing library of your choice, such as Mocha or Jest.

### Cron Job for Fetching Videos
A cron job runs every 10 seconds and fetches the latest videos based on the search query `cricket`. You can modify the query in the `cronJob.js` file.

### Database Model
The `Video` model stores the following fields:
- `video_id`: The unique ID of the video.
- `title`: The title of the video.
- `description`: The description of the video.
- `published_at`: The date and time when the video was published.
- `thumbnail_url`: The URL of the default thumbnail.
- `channel_title`: The name of the channel.
- `live_broadcast_content`: The live broadcast content status.
- `thumbnails`: A JSON object containing multiple thumbnail sizes.

<!-- ## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. -->
