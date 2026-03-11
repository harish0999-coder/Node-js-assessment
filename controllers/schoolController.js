// controllers/schoolController.js
const { createSchool, getAllSchools } = require('../models/schoolModel');
const { haversineDistance }           = require('../utils/distance');

async function addSchool(req, res) {
  try {
    const { name, address, latitude, longitude } = req.validated;
    const result = await createSchool({ name, address, latitude, longitude });
    return res.status(201).json({
      success: true,
      message: 'School added successfully',
      data: { id: result.insertId, name, address, latitude, longitude },
    });
  } catch (err) {
    console.error('[addSchool] error:', err.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

async function listSchools(req, res) {
  try {
    const { latitude: userLat, longitude: userLng } = req.validated;
    const schools = await getAllSchools();
    const sorted = schools
      .map((s) => ({
        ...s,
        distance_km: haversineDistance(userLat, userLng, s.latitude, s.longitude),
      }))
      .sort((a, b) => a.distance_km - b.distance_km);
    return res.status(200).json({
      success: true,
      message: `${sorted.length} school(s) found`,
      user_location: { latitude: userLat, longitude: userLng },
      data: sorted,
    });
  } catch (err) {
    console.error('[listSchools] error:', err.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

module.exports = { addSchool, listSchools };
