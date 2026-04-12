const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('localhost')
    ? false
    : { rejectUnauthorized: false },
})

async function init() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS user_data (
      key        TEXT PRIMARY KEY,
      value      JSONB NOT NULL,
      updated_at TIMESTAMPTZ DEFAULT now()
    )
  `)
}

init().catch(console.error)

async function getData(key) {
  const { rows } = await pool.query(
    'SELECT key, value FROM user_data WHERE key = $1',
    [key]
  )
  return rows[0] || null
}

async function setData(key, value) {
  const { rows } = await pool.query(
    `INSERT INTO user_data (key, value)
     VALUES ($1, $2)
     ON CONFLICT (key) DO UPDATE
       SET value = $2, updated_at = now()
     RETURNING key, value, updated_at`,
    [key, JSON.stringify(value)]
  )
  return rows[0]
}

async function getAllData() {
  const { rows } = await pool.query('SELECT key, value FROM user_data')
  return Object.fromEntries(rows.map((r) => [r.key, r.value]))
}

module.exports = { getData, setData, getAllData }
