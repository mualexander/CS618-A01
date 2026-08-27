import 'dotenv/config'
import { app } from './app.js'
import { initDatabase } from './db/init.js'

const PORT = process.env.PORT || 3001

try {
  await initDatabase()
  app.listen(PORT, () => console.log(`api: listening on http://localhost:${PORT}`))
} catch (err) {
  console.error('api: failed to start:', err)
  process.exit(1)
}
