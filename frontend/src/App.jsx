import { useEffect, useState } from 'react'

const protocol = window.location.protocol
const host = window.location.hostname

const API = {
  users: import.meta.env.VITE_USERS_API || `${protocol}//${host}:8001`,
  tasks: import.meta.env.VITE_TASKS_API || `${protocol}//${host}:8002`,
  messages: import.meta.env.VITE_MESSAGES_API || `${protocol}//${host}:8003`,
}

function App() {
  const [users, setUsers] = useState([])
  const [tasks, setTasks] = useState([])
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [usersRes, tasksRes, messagesRes] = await Promise.all([
          fetch(`${API.users}/api/users`),
          fetch(`${API.tasks}/api/tasks`),
          fetch(`${API.messages}/api/messages`),
        ])

        if (!usersRes.ok || !tasksRes.ok || !messagesRes.ok) {
          throw new Error('One or more backend services are unavailable.')
        }

        const [usersData, tasksData, messagesData] = await Promise.all([
          usersRes.json(),
          tasksRes.json(),
          messagesRes.json(),
        ])

        setUsers(usersData)
        setTasks(tasksData)
        setMessages(messagesData)
      } catch (err) {
        setError(err.message || 'Could not load dashboard data.')
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [])

  return (
    <main className="page-shell">
      <section className="hero">
        <p className="eyebrow">React + FastAPI + Docker</p>
        <h1>Mini Microservices Task Dashboard</h1>
        <p>
          One frontend talking to three independent FastAPI microservices.
        </p>
      </section>

      {loading && <div className="notice">Loading services...</div>}
      {error && <div className="notice error">{error}</div>}

      {!loading && !error && (
        <>
          <section className="stats-grid">
            <article className="stat-card">
              <span>Users</span>
              <strong>{users.length}</strong>
              <small>user-service :8001</small>
            </article>
            <article className="stat-card">
              <span>Tasks</span>
              <strong>{tasks.length}</strong>
              <small>task-service :8002</small>
            </article>
            <article className="stat-card">
              <span>Messages</span>
              <strong>{messages.length}</strong>
              <small>message-service :8003</small>
            </article>
          </section>

          <section className="content-grid">
            <article className="panel">
              <div className="panel-heading">
                <h2>Team</h2>
                <span>{users.length} members</span>
              </div>
              <div className="list">
                {users.map((user) => (
                  <div className="list-row" key={user.id}>
                    <div>
                      <strong>{user.name}</strong>
                      <p>{user.role}</p>
                    </div>
                    <span className="badge">#{user.id}</span>
                  </div>
                ))}
              </div>
            </article>

            <article className="panel">
              <div className="panel-heading">
                <h2>Tasks</h2>
                <span>{tasks.filter((task) => task.done).length} done</span>
              </div>
              <div className="list">
                {tasks.map((task) => (
                  <div className="list-row" key={task.id}>
                    <div>
                      <strong>{task.title}</strong>
                      <p>Assigned to user #{task.user_id}</p>
                    </div>
                    <span className={`badge ${task.done ? 'success' : 'pending'}`}>
                      {task.done ? 'Done' : 'Open'}
                    </span>
                  </div>
                ))}
              </div>
            </article>

            <article className="panel full-width">
              <div className="panel-heading">
                <h2>Messages</h2>
                <span>Latest updates</span>
              </div>
              <div className="list">
                {messages.map((message) => (
                  <div className="message" key={message.id}>
                    <strong>{message.author}</strong>
                    <p>{message.text}</p>
                  </div>
                ))}
              </div>
            </article>
          </section>
        </>
      )}
    </main>
  )
}

export default App
