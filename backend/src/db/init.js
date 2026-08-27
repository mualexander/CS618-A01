import mongoose from 'mongoose'

export function initDatabase() {
  const url = process.env.DATABASE_URL
  mongoose.connection.on('open', () => console.log('mongo: connected to', url))
  mongoose.connection.on('error', (err) => console.error('mongo:', err.message))
  return mongoose.connect(url)
}
