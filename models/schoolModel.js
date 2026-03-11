// models/schoolModel.js
const { pool } = require('../config/db');

async function createSchool({ name, address, latitude, longitude }) {
  const sql = `INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)`;
  const [result] = await pool.query(sql, [name, address, latitude, longitude]);
  return result;
}

async function getAllSchools() {
  const [rows] = await pool.query('SELECT * FROM schools');
  return rows;
}

module.exports = { createSchool, getAllSchools };
