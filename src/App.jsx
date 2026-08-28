import { useEffect, useState } from 'react'

export default function App() {
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState(null)

  async function load() {
    try {
      const res = await fetch('/api/notes')
      if (!res.ok) throw new Error(`GET failed: ${res.status}`)
      setNotes(await res.json())
    } catch (err) {
      setError(err.message)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    try {
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      })
      if (!res.ok) throw new Error((await res.json()).error ?? res.status)
      setTitle('')
      setContent('')
      await load()
    } catch (err) {
      setError(String(err.message))
    }
  }

  return (
    <main style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'system-ui' }}>
      <h1>Notes</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        /><br />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
        /><br />
        <button type="submit">Save</button>
      </form>

      {error && <p style={{ color: 'crimson' }}>{error}</p>}

      <ul>
        {notes.map((note) => (
          <li key={note._id}>
            <strong>{note.title}</strong> — {note.content}
          </li>
        ))}
      </ul>
    </main>
  )
}