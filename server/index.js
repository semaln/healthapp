const express = require('express')
const cors = require('cors')
const { getData, setData, getAllData } = require('./db')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors({ origin: '*' }))
app.use(express.json())

// Auth middleware — all routes except /health require Bearer token
function auth(req, res, next) {
  const header = req.headers['authorization'] || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token || token !== process.env.API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  next()
}

// Health check — no auth, used by Railway
app.get('/health', (req, res) => {
  res.json({ ok: true })
})

// Fetch all key-value pairs (used at app startup for full sync)
app.get('/data', auth, async (req, res) => {
  try {
    const data = await getAllData()
    res.json(data)
  } catch (e) {
    console.error('GET /data error:', e)
    res.status(500).json({ error: 'Server error' })
  }
})

// Fetch single key
app.get('/data/:key', auth, async (req, res) => {
  try {
    const row = await getData(req.params.key)
    if (!row) return res.status(404).json({ error: 'Not found' })
    res.json({ value: row.value })
  } catch (e) {
    console.error('GET /data/:key error:', e)
    res.status(500).json({ error: 'Server error' })
  }
})

// Upsert a key-value pair
app.put('/data/:key', auth, async (req, res) => {
  try {
    const { value } = req.body
    if (value === undefined) return res.status(400).json({ error: 'Missing value' })
    const row = await setData(req.params.key, value)
    res.json({ key: row.key, updated_at: row.updated_at })
  } catch (e) {
    console.error('PUT /data/:key error:', e)
    res.status(500).json({ error: 'Server error' })
  }
})

app.listen(PORT, () => {
  console.log(`Healthapp API running on port ${PORT}`)
})
