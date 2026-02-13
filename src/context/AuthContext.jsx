import { createContext, useContext, useState } from "react"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    localStorage.getItem("token") || sessionStorage.getItem("token")
  )

  const login = (jwt, remember = true) => {
    if (remember) {
      localStorage.setItem("token", jwt)
    } else {
      sessionStorage.setItem("token", jwt)
    }
    setToken(jwt)
  }

  const logout = () => {
    localStorage.removeItem("token")
    sessionStorage.removeItem("token")
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
