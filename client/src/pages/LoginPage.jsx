import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext'
import { ThemeContext } from '../../context/ThemeContext'

const LoginPage = () => {

  const [mode, setMode] = useState('login')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [bio, setBio] = useState('')

  const {login} = useContext(AuthContext)
  const { theme } = useContext(ThemeContext)

  const onSubmitHandler = (event)=>{
    event.preventDefault();
    login(mode === 'signup' ? 'signup' : 'login', {fullName, email, password, bio})
  }

  const lightModeBg = "radial-gradient(circle farthest-corner at top left, rgba(79,70,229,0.08), transparent 22%), radial-gradient(circle farthest-corner at bottom right, rgba(168,85,247,0.08), transparent 24%), linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)"
  const darkModeBg = "radial-gradient(circle farthest-corner at top left, rgba(79,70,229,0.16), transparent 22%), radial-gradient(circle farthest-corner at bottom right, rgba(168,85,247,0.18), transparent 24%), linear-gradient(180deg, #020617 0%, #060b19 100%)"

  return (
    <div className='min-h-screen px-4 py-8 grid place-items-center' style={{ backgroundImage: theme === 'light' ? lightModeBg : darkModeBg, color: 'var(--text-primary)' }}>
      <div className='grid w-full max-w-6xl gap-6 rounded-[36px] border p-6 shadow-2xl backdrop-blur-3xl lg:grid-cols-[1.05fr_0.95fr]' style={{ borderColor: 'var(--border-color)', backgroundColor: theme === 'light' ? 'rgba(248, 250, 252, 0.7)' : 'rgba(15, 23, 42, 0.7)', boxShadow: theme === 'light' ? '0 25px 50px -12px rgba(0, 0, 0, 0.1)' : '0 25px 50px -12px rgba(0, 0, 0, 0.3)' }}>

        <div className='flex flex-col justify-center gap-6 rounded-[32px] border p-10' style={{ borderColor: 'var(--border-color)', backgroundColor: theme === 'light' ? '#f1f5f9' : 'rgba(30, 41, 59, 0.8)', color: theme === 'light' ? '#475569' : '#cbd5e1' }}>
          <div className='flex items-center gap-4'>
<div className='flex h-24 w-24 items-center justify-center rounded-3xl p-2' style={{ backgroundColor: theme === 'light' ? '#e2e8f0' : 'rgba(30, 41, 59, 0.8)', boxShadow: theme === 'light' ? '0 4px 6px rgba(0, 0, 0, 0.1)' : '0 4px 6px rgba(0, 0, 0, 0.5)' }}>
              <img src={assets.logo_big} alt="NovaChat" className='h-full w-full object-contain' />
            </div>
            <div>
              <p className='text-sm uppercase tracking-[0.35em]' style={{ color: 'var(--accent-color)' }}>ChatLoop</p>
              <h1 className='text-5xl font-bold' style={{ color: 'var(--text-primary)' }}>ChatLoop</h1>
            </div>
          </div>
        </div>

        <form onSubmit={onSubmitHandler} className='rounded-[32px] border p-8 shadow-2xl backdrop-blur-xl' style={{ borderColor: 'var(--border-color)', backgroundColor: theme === 'light' ? 'rgba(248, 250, 252, 0.8)' : 'rgba(15, 23, 42, 0.8)', boxShadow: theme === 'light' ? '0 25px 50px -12px rgba(0, 0, 0, 0.1)' : '0 25px 50px -12px rgba(0, 0, 0, 0.3)' }}>
          <div className='flex flex-col gap-3 pb-6 sm:flex-row sm:items-center sm:justify-between'>
            <div>
              <p className='text-sm uppercase tracking-[0.3em]' style={{ color: 'var(--accent-color)' }}>Welcome</p>
              <h2 className='text-3xl font-semibold' style={{ color: 'var(--text-primary)' }}>{mode === 'signup' ? 'Create an account' : 'Sign in to ChatLoop'}</h2>
            </div>
            <div className='inline-flex rounded-full p-1' style={{ backgroundColor: theme === 'light' ? '#e2e8f0' : 'rgba(30, 41, 59, 0.8)' }}>
              <button type='button' onClick={()=> setMode('login')} className={`rounded-full px-4 py-2 text-sm transition`} style={{ backgroundColor: mode === 'login' ? 'var(--accent-color)' : 'transparent', color: mode === 'login' ? 'white' : 'var(--text-secondary)' }}>
                Login
              </button>
              <button type='button' onClick={()=> setMode('signup')} className={`rounded-full px-4 py-2 text-sm transition`} style={{ backgroundColor: mode === 'signup' ? '#a855f7' : 'transparent', color: mode === 'signup' ? 'white' : 'var(--text-secondary)' }}>
                Sign up
              </button>
            </div>
          </div>

          {mode === 'signup' && (
            <input onChange={(e)=>setFullName(e.target.value)} value={fullName}
             type='text' placeholder='Full name' required className='mb-4 w-full rounded-3xl p-4 text-sm outline-none transition focus:ring-2' style={{ borderColor: 'var(--border-color)', backgroundColor: theme === 'light' ? '#f1f5f9' : 'rgba(30, 41, 59, 0.8)', color: 'var(--text-primary)', border: `1px solid var(--border-color)`, focusRingColor: 'var(--accent-color)' }} />
          )}

          <input onChange={(e)=>setEmail(e.target.value)} value={email}
           type='email' placeholder='Email address' required className='mb-4 w-full rounded-3xl p-4 text-sm outline-none transition focus:ring-2' style={{ borderColor: 'var(--border-color)', backgroundColor: theme === 'light' ? '#f1f5f9' : 'rgba(30, 41, 59, 0.8)', color: 'var(--text-primary)', border: `1px solid var(--border-color)` }} />

          <input onChange={(e)=>setPassword(e.target.value)} value={password}
           type='password' placeholder='Password' required className='mb-4 w-full rounded-3xl p-4 text-sm outline-none transition focus:ring-2' style={{ borderColor: 'var(--border-color)', backgroundColor: theme === 'light' ? '#f1f5f9' : 'rgba(30, 41, 59, 0.8)', color: 'var(--text-primary)', border: `1px solid var(--border-color)` }} />

          {mode === 'signup' && (
            <textarea onChange={(e)=>setBio(e.target.value)} value={bio}
             rows={4} placeholder='Tell us a bit about yourself' className='mb-6 w-full rounded-3xl p-4 text-sm outline-none transition focus:ring-2' style={{ borderColor: 'var(--border-color)', backgroundColor: theme === 'light' ? '#f1f5f9' : 'rgba(30, 41, 59, 0.8)', color: 'var(--text-primary)', border: `1px solid var(--border-color)` }} />
          )}

          <button type='submit' className='w-full rounded-3xl py-4 text-sm font-semibold text-white transition hover:brightness-110' style={{ background: 'linear-gradient(to right, var(--accent-color), #a855f7)' }}>
            {mode === 'signup' ? 'Create account' : 'Login'}
          </button>

          <p className='mt-5 text-center text-sm' style={{ color: 'var(--text-secondary)' }}>
            {mode === 'signup' ? 'Already have an account?' : 'New to ChatLoop?'}{' '}
            <span onClick={()=> setMode(mode === 'signup' ? 'login' : 'signup')} className='cursor-pointer font-medium' style={{ color: 'var(--accent-color)' }}>
              {mode === 'signup' ? 'Login instead' : 'Create account'}
            </span>
          </p>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
