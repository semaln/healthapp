const express = require('express')
const cors = require('cors')
const { getData, setData, getAllData } = require('./db')
const { getClient, invalidateSession } = require('./garmin')

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

// Garmin today — fetches steps, body battery, stress, sleep for today
app.get('/garmin/today', auth, async (req, res) => {
  try {
    console.log('[Garmin] Logging in...')
    const gc = await getClient()
    console.log('[Garmin] Login OK, fetching data...')

    const [summary, sleep, bodyBatteryData] = await Promise.allSettled([
      gc.getUserSummary(),
      gc.getSleep(),
      gc.getBodyBattery(new Date(), new Date()),
    ])

    console.log('[Garmin] summary:', summary.status, summary.reason?.message ?? '')
    console.log('[Garmin] sleep:', sleep.status, sleep.reason?.message ?? '')
    console.log('[Garmin] bodyBattery:', bodyBatteryData.status, bodyBatteryData.reason?.message ?? '')

    const s = summary.status === 'fulfilled' ? summary.value : null
    const sl = sleep.status === 'fulfilled' ? sleep.value : null
    const bb = bodyBatteryData.status === 'fulfilled' ? bodyBatteryData.value : null

    if (s) console.log('[Garmin] summary keys:', Object.keys(s))
    if (sl) console.log('[Garmin] sleep keys:', Object.keys(sl))
    if (bb) console.log('[Garmin] bodyBattery sample:', JSON.stringify(bb?.[0]))

    const steps = s?.totalSteps ?? null
    const stress = s?.averageStressLevel ?? null

    const sleepSeconds = sl?.dailySleepDTO?.sleepTimeSeconds ?? null
    const sleepHours = sleepSeconds != null
      ? Math.round((sleepSeconds / 3600) * 2) / 2
      : null

    const bodyBattery = Array.isArray(bb) && bb.length
      ? Math.max(...bb.map((r) => r.charged ?? 0))
      : null

    const result = { steps, body_battery: bodyBattery, stress_score: stress, sleep_hours: sleepHours }
    console.log('[Garmin] result:', JSON.stringify(result))
    res.json(result)
  } catch (e) {
    console.error('[Garmin] FATAL:', e.message, e.stack)
    invalidateSession()
    res.status(502).json({ error: 'Garmin fetch failed', detail: e.message })
  }
})

app.listen(PORT, () => {
  console.log(`Healthapp API running on port ${PORT}`)
})
