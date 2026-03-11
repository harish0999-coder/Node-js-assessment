// index.js  ← ROOT entry point (Railway runs: node index.js)
require('dotenv').config();

const express            = require('express');
const { testConnection } = require('./config/db');
const { initDb }         = require('./config/initDb');
const schoolRoutes       = require('./routes/schoolRoutes');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ───────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple request logger
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// ── Health check ─────────────────────────────────────────────────────────────
app.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'School Management API is running 🚀',
    version: '1.0.0',
    endpoints: {
      addSchool:   'POST /addSchool',
      listSchools: 'GET  /listSchools?latitude=<lat>&longitude=<lng>',
    },
  });
});

// ── API Routes ───────────────────────────────────────────────────────────────
app.use('/', schoolRoutes);

// ── 404 handler ──────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ── Global error handler ──────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

// ── Boot ──────────────────────────────────────────────────────────────────────
(async () => {
  await testConnection();
  await initDb();
  app.listen(PORT, () => {
    console.log(`🚀  Server listening on http://localhost:${PORT}`);
  });
})();
