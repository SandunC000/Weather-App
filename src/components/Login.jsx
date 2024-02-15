import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import ErrorPopup from "./ErrorPopup"
import "../assets/styles/Login.css"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [showErrorPopup, setShowErrorPopup] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const navigate = useNavigate()

  const handleLogin = () => {
    if (username === "demo" && password === "demo") {
      setErrorMessage("Login Success...")
      setShowErrorPopup(true)
      setTimeout(() => {
        navigate("/weather")
      }, 500)
    } else {
      setErrorMessage("Invalid Credentials. Please try again.")
      setShowErrorPopup(true)
    }
  }

  const closeErrorPopup = () => {
    setShowErrorPopup(false)
  }

  return (
    <div className={`login-container ${showErrorPopup ? "show-overlay" : ""}`}>
      <div>
        <h2 className='title'>Login</h2>
        <div className='top-bar'>
          <div>
            <label htmlFor='username' className='text'>
              Username
            </label>
            <input
              type='text'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <label htmlFor='password' className='text'>
              Password
            </label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <button type='button' className='login-button' onClick={handleLogin}>
          Login
        </button>

        {showErrorPopup && <div className='overlay'></div>}
        {showErrorPopup && <ErrorPopup errorMessage={errorMessage} onClose={closeErrorPopup} />}
      </div>
    </div>
  )
}

export default Login