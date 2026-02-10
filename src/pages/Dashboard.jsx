
import { useEffect, useState } from "react"
import { getProfile } from "../api"
import { useNavigate } from "react-router-dom"

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const nav = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) return nav("/")

    getProfile(token)
      .then((res) => setUser(res.data))
      .catch(() => nav("/"))
  }, [])

  if (!user) return <h2>Loading...</h2>

  return (
    <div className="card">
      <h1>🎉 Welcome {user.full_name}</h1>
      <p>Email: {user.email}</p>
      <button onClick={() => {
        localStorage.removeItem("token")
        nav("/")
      }}>
        Logout
      </button>
    </div>
  )
}
