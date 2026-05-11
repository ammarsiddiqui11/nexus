import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import contactRoutes from './routes/contact.js'
import projectRoutes from './routes/projects.js'
import errorHandler from './middleware/errorHandler.js'

const PORT = process.env.PORT || 5000
const app = express()

// ─── Middleware ────────────────────────────────────────
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://nexus.agency', 'https://www.nexus.agency']
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}))

app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))

// ─── Security Headers ──────────────────────────────────
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('X-XSS-Protection', '1; mode=block')
  next()
})

// ─── Health Check ──────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  })
})

// ─── Routes ───────────────────────────────────────────
app.use('/api/contact', contactRoutes)
app.use('/api/projects', projectRoutes)

// ─── 404 Handler ──────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.url} not found` })
})

// ─── Error Handler ────────────────────────────────────
app.use(errorHandler)

// ─── Start ────────────────────────────────────────────
const startServer = async () => {
  await connectDB()
  app.listen(PORT, () => {
    console.log(`🚀 NEXUS Server running on http://localhost:${PORT}`)
    console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`)
  })
}

startServer()
