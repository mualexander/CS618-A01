import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

const app = express()
app.use(cors())
app.use(express.json())

const STATES = ['disconnected', 'connected', 'connecting', 'disconnecting']

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', db: STATES[mongoose.connection.readyState] })
})

export { app }
