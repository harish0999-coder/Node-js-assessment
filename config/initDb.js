// config/initDb.js
const { pool } = require('./db');

const CREATE_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS schools (
    id        INT           NOT NULL AUTO_INCREMENT,
    name      VARCHAR(255)  NOT NULL,
    address   VARCHAR(500)  NOT NULL,
    latitude  FLOAT         NOT NULL,
    longitude FLOAT         NOT NULL,
    PRIMARY KEY (id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`;

async function initDb() {
  try {
    await pool.query(CREATE_TABLE_SQL);
    console.log('✅  schools table ready');
  } catch (err) {
    console.error('❌  Failed to initialise database:', err.message);
    process.exit(1);
  }
}

module.exports = { initDb };
