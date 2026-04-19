const { GarminConnect } = require('garmin-connect')

let client = null
let lastLogin = null
const SESSION_TTL_MS = 60 * 60 * 1000 // re-login after 1 hour

async function getClient() {
  const now = Date.now()
  if (!client || !lastLogin || now - lastLogin > SESSION_TTL_MS) {
    const email = process.env.GARMIN_EMAIL
    const password = process.env.GARMIN_PASSWORD
    if (!email || !password) throw new Error('GARMIN_EMAIL / GARMIN_PASSWORD not set')

    // v1.x: login(username, password)
    client = new GarminConnect()
    await client.login(email, password)
    lastLogin = now
  }
  return client
}

function invalidateSession() {
  client = null
  lastLogin = null
}

module.exports = { getClient, invalidateSession }
