import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { pullFromCloud, flushPendingQueue } from './services/sync.js'

async function init() {
  // Pull latest data from Railway before mounting, with 3s timeout.
  // If server is unavailable (offline or sleeping), the app still loads normally.
  await Promise.race([
    (async () => {
      await pullFromCloud()
      await flushPendingQueue()
    })(),
    new Promise((resolve) => setTimeout(resolve, 3000)),
  ])

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <BrowserRouter basename="/healthapp">
        <App />
      </BrowserRouter>
    </React.StrictMode>
  )
}

init()
