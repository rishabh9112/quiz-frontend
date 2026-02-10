
import { useState } from "react"
import { registerUser } from "../api"
import { useNavigate, Link } from "react-router-dom"

export default function Register() {
  const [form, setForm] = useState({})
  const nav = useNavigate()

  const handleRegister = async () => {
    try {
      const res = await registerUser(form)
      localStorage.setItem("token", res.data.access_token)
      nav("/dashboard")
    } catch {
      alert("Registration failed")
    }
  }

  return (
    <div className="card">
      <h1>🧩 Join the Fun Quiz</h1>
      <input placeholder="Full Name" onChange={(e) => setForm({...form, full_name:e.target.value})} />
      <input placeholder="Email" onChange={(e) => setForm({...form, email:e.target.value})} />
      <input type="password" placeholder="Password" onChange={(e) => setForm({...form, password:e.target.value})} />
      <button onClick={handleRegister}>Register</button>
      <p>
        Already user? <Link to="/">Login</Link>
      </p>
    </div>
  )
}
