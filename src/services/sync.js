const API_URL = import.meta.env.VITE_API_URL
const API_KEY = import.meta.env.VITE_API_KEY

const QUEUE_KEY = 'sync_pending_queue'

// Keys that should never be synced to the cloud
const EXCLUDED_KEYS = [QUEUE_KEY]

function isConfigured() {
  return Boolean(API_URL && API_KEY)
}

async function apiCall(method, path, body, timeoutMs = 5000) {
  if (!isConfigured()) return null
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(`${API_URL}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    })
    clearTimeout(timer)
    if (!res.ok) return null
    return await res.json()
  } catch {
    clearTimeout(timer)
    return null  // network error or timeout — fail silently
  }
}

function getQueue() {
  try {
    return JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]')
  } catch {
    return []
  }
}

function saveQueue(queue) {
  try {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue))
  } catch {}
}

/**
 * Called after every useLocalStorage write.
 * Fire-and-forget — failures are queued for retry.
 */
export async function pushToCloud(key, value) {
  if (!isConfigured() || EXCLUDED_KEYS.includes(key)) return

  const result = await apiCall('PUT', `/data/${encodeURIComponent(key)}`, { value })

  if (!result) {
    // Failed — add/update in pending queue (deduplicate by key)
    const queue = getQueue().filter((item) => item.key !== key)
    queue.push({ key, value })
    saveQueue(queue)
  } else {
    // Succeeded — remove from pending queue if it was there
    const queue = getQueue().filter((item) => item.key !== key)
    saveQueue(queue)
  }
}

/**
 * Generic GET call — for use in components that need to fetch from the API.
 */
export async function apiGet(path, timeoutMs = 8000) {
  return apiCall('GET', path, undefined, timeoutMs)
}

/**
 * Called before the app mounts.
 * Fetches all data from Railway and writes to localStorage,
 * skipping keys that are pending (those are newer locally).
 */
export async function pullFromCloud() {
  if (!isConfigured()) return

  const data = await apiCall('GET', '/data', undefined, 3000)
  if (!data || typeof data !== 'object') return

  const pendingKeys = new Set(getQueue().map((item) => item.key))

  for (const [key, value] of Object.entries(data)) {
    if (pendingKeys.has(key)) continue  // local is newer — skip
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {}
  }
}

/**
 * Retries all items in the pending queue.
 * Called after pullFromCloud on app startup.
 */
export async function flushPendingQueue() {
  if (!isConfigured()) return

  const queue = getQueue()
  if (queue.length === 0) return

  const remaining = []
  for (const item of queue) {
    const result = await apiCall('PUT', `/data/${encodeURIComponent(item.key)}`, { value: item.value })
    if (!result) {
      remaining.push(item)
    }
  }
  saveQueue(remaining)
}
