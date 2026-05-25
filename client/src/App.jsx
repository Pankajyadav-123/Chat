import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import {Toaster} from "react-hot-toast"
import { AuthContext } from '../context/AuthContext'
import { ThemeContext } from '../context/ThemeContext'

const App = () => {
  const { authUser } = useContext(AuthContext)
  const { theme } = useContext(ThemeContext)

  const backgroundStyle = theme === 'light' 
    ? "radial-gradient(circle at top, rgba(79,70,229,0.1), transparent 30%), radial-gradient(circle at bottom right, rgba(168,85,247,0.08), transparent 28%), linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)"
    : "radial-gradient(circle at top, rgba(79,70,229,0.18), transparent 30%), radial-gradient(circle at bottom right, rgba(168,85,247,0.12), transparent 28%), linear-gradient(180deg, #020617 0%, #111827 100%)"

  return (
    <div className="min-h-screen" style={{ backgroundImage: backgroundStyle, color: 'var(--text-primary)' }}>
      <Toaster />
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login" />}/>
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to="/" />}/>
        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to="/login" />}/>
      </Routes>
    </div>
  )
}

export default App
