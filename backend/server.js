import 'dotenv/config'
import connectDB, { getDbStatus } from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import { createApp } from './app.js'

/**
 * Server bootstrap using app factory.
 * - Initializes DB and Cloudinary.
 * - Binds to PORT and exposes health and existing routes from app.js.
 */
const port = Number(process.env.PORT) || 3001

// Initialize integrations (non-blocking with logs)
;(async () => {
  try {
    connectDB().catch((err) => {
      console.error('Initial DB connection attempt failed:', err?.message || err)
    })
    await connectCloudinary()
  } catch (err) {
    console.error('Startup integration error:', err?.message || err)
  }
})()

const app = createApp()

// Preserve existing root endpoint and enhanced health endpoint
// PUBLIC_INTERFACE
app.get('/healthz', (req, res) => {
  const status = {
    service: 'ok',
    db: typeof getDbStatus === 'function' ? getDbStatus() : 'unknown',
    time: new Date().toISOString()
  }
  const httpCode = status.db === 'connected' ? 200 : 503
  res.status(httpCode).json(status)
})

// PUBLIC_INTERFACE
app.get('/', (req, res) => {
  res.send('API Working')
})

const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Server started on PORT:${port} and bound to 0.0.0.0`)
})

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. Ensure no other service is listening on this port.`)
  } else {
    console.error('Server listen error:', err)
  }
  process.exit(1)
})
