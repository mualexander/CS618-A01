import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import { Note } from './models/note.js'

const app = express()
app.use(cors())
app.use(express.json())

const STATES = ['disconnected', 'connected', 'connecting', 'disconnecting']


app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', db: STATES[mongoose.connection.readyState] })
})

app.get('/api/notes', async (req, res) => {
  const notes = await Note.find().sort({ createdAt: -1 })
  res.json(notes)
})

app.post('/api/notes', async (req, res) => {
  try {
    const note = await Note.create({
      title: req.body.title,
      content: req.body.content,
    })
    res.status(201).json(note)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

export { app }
