
import { useState } from "react"
import { loginUser } from "../api"
import { useNavigate, Link } from "react-router-dom"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const nav = useNavigate()

  const handleLogin = async () => {
    try {
      const res = await loginUser({ email, password })
      localStorage.setItem("token", res.data.access_token)
      nav("/dashboard")
    } catch {
      alert("Login failed")
    }
  }

  return (
    <div className="card">
      <h1>🎮 Fun Quiz Login</h1>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p>
        New here? <Link to="/register">Register</Link>
      </p>
    </div>
  )
}
