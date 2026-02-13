import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../api"
import { useAuth } from "../context/AuthContext"

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" })
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const res = await loginUser(form)

      login(res.data.access_token, true)

      navigate("/dashboard")
    } catch (error) {
      alert(error?.response?.data?.detail || "Login failed")
    }
  }

  return (
    <div className="card">
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      {/* Google Login */}
      <button
        onClick={() =>
          window.location.href =
            import.meta.env.VITE_API_BASE_URL +
            "/auth/google/login"
        }
      >
        Login with Google
      </button>

      <button onClick={handleLogin}>Login</button>
    </div>
  )
}
