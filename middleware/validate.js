// middleware/validate.js

function validateAddSchool(req, res, next) {
  const { name, address, latitude, longitude } = req.body;
  const errors = [];

  if (!name || typeof name !== 'string' || name.trim().length === 0)
    errors.push('name is required and must be a non-empty string');

  if (!address || typeof address !== 'string' || address.trim().length === 0)
    errors.push('address is required and must be a non-empty string');

  const lat = parseFloat(latitude);
  if (latitude === undefined || latitude === null || latitude === '' || isNaN(lat))
    errors.push('latitude is required and must be a valid number');
  else if (lat < -90 || lat > 90)
    errors.push('latitude must be between -90 and 90');

  const lng = parseFloat(longitude);
  if (longitude === undefined || longitude === null || longitude === '' || isNaN(lng))
    errors.push('longitude is required and must be a valid number');
  else if (lng < -180 || lng > 180)
    errors.push('longitude must be between -180 and 180');

  if (errors.length > 0)
    return res.status(400).json({ success: false, message: 'Validation failed', errors });

  req.validated = { name: name.trim(), address: address.trim(), latitude: lat, longitude: lng };
  next();
}

function validateListSchools(req, res, next) {
  const { latitude, longitude } = req.query;
  const errors = [];

  const lat = parseFloat(latitude);
  if (!latitude || isNaN(lat))
    errors.push('latitude query parameter is required and must be a valid number');
  else if (lat < -90 || lat > 90)
    errors.push('latitude must be between -90 and 90');

  const lng = parseFloat(longitude);
  if (!longitude || isNaN(lng))
    errors.push('longitude query parameter is required and must be a valid number');
  else if (lng < -180 || lng > 180)
    errors.push('longitude must be between -180 and 180');

  if (errors.length > 0)
    return res.status(400).json({ success: false, message: 'Validation failed', errors });

  req.validated = { latitude: lat, longitude: lng };
  next();
}

module.exports = { validateAddSchool, validateListSchools };
