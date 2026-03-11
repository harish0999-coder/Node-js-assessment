# School Management API

Node.js + Express.js + MySQL REST API for managing schools with proximity-based sorting.

## Project Structure

```
school-management-api/
├── index.js                  ← Entry point
├── package.json
├── .env.example
├── config/
│   ├── db.js                 ← MySQL connection pool
│   └── initDb.js             ← Auto-creates schools table
├── controllers/
│   └── schoolController.js   ← Business logic
├── middleware/
│   └── validate.js           ← Input validation
├── models/
│   └── schoolModel.js        ← DB queries
├── routes/
│   └── schoolRoutes.js       ← Route definitions
└── utils/
    └── distance.js           ← Haversine formula
```

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env with your MySQL credentials

# 3. Create database (one-time)
# Run in MySQL: CREATE DATABASE school_management;
# The schools table is created automatically on server start.

# 4. Start server
npm start          # production
npm run dev        # development with auto-reload
```

## API Endpoints

### GET /
Health check — confirms server is running.

### POST /addSchool
**Body (JSON):**
```json
{
  "name": "Delhi Public School",
  "address": "Mathura Road, New Delhi",
  "latitude": 28.5355,
  "longitude": 77.3910
}
```

### GET /listSchools?latitude=28.6139&longitude=77.2090
Returns all schools sorted by distance (km) from the given coordinates.

## Environment Variables

| Variable    | Description              |
|-------------|--------------------------|
| PORT        | Server port (default 3000)|
| DB_HOST     | MySQL host               |
| DB_PORT     | MySQL port (default 3306)|
| DB_USER     | MySQL username           |
| DB_PASSWORD | MySQL password           |
| DB_NAME     | Database name            |
