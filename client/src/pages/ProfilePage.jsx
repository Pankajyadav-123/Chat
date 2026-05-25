import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';

const ProfilePage = () => {

  const {authUser, updateProfile} = useContext(AuthContext)
  const { theme } = useContext(ThemeContext)

  const [selectedImg, setSelectedImg] = useState(null)
  const navigate = useNavigate();
  const [name, setName] = useState(authUser.fullName)
  const [bio, setBio] = useState(authUser.bio)

  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(!selectedImg){
      await updateProfile({fullName: name, bio});
      navigate('/');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedImg);
    reader.onload = async ()=>{
      const base64Image = reader.result;
      await updateProfile({profilePic: base64Image, fullName: name, bio});
      navigate('/');
    }
    
  }

  const lightModeBg = "radial-gradient(circle at top left, rgba(79,70,229,0.08), transparent 30%), linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)"
  const darkModeBg = "radial-gradient(circle at top left, rgba(79,70,229,0.16), transparent 30%), linear-gradient(180deg, #020617 0%, #111827 100%)"

  return (
    <div className='min-h-screen px-4 py-8 grid place-items-center' style={{ backgroundImage: theme === 'light' ? lightModeBg : darkModeBg, color: 'var(--text-primary)' }}>
      <div className='flex h-full w-full max-w-5xl flex-col gap-10 rounded-[32px] border p-6 shadow-2xl backdrop-blur-3xl lg:h-[calc(100vh-6rem)] lg:flex-row' style={{ borderColor: 'var(--border-color)', backgroundColor: theme === 'light' ? 'rgba(248, 250, 252, 0.8)' : 'rgba(15, 23, 42, 0.8)', boxShadow: theme === 'light' ? '0 25px 50px -12px rgba(0, 0, 0, 0.1)' : '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
        <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-6">
          <div>
            <p className='text-sm uppercase tracking-[0.3em]' style={{ color: 'var(--accent-color)' }}>ChatLoop profile</p>
            <h3 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>Profile details</h3>
            <p className='mt-2 text-sm' style={{ color: 'var(--text-secondary)' }}>Update your name, bio, and avatar with a clean, responsive layout.</p>
          </div>
          <label htmlFor="avatar" className='flex items-center gap-4 rounded-3xl border p-4 text-sm transition cursor-pointer' style={{ borderColor: 'var(--border-color)', backgroundColor: theme === 'light' ? '#f1f5f9' : 'rgba(30, 41, 59, 0.8)', color: 'var(--text-secondary)' }}>
            <input onChange={(e)=>setSelectedImg(e.target.files[0])} type="file" id='avatar' accept='.png, .jpg, .jpeg' hidden/>
            <img src={selectedImg ? URL.createObjectURL(selectedImg) : authUser?.profilePic || assets.avatar_icon} alt="Avatar" className='h-14 w-14 rounded-full object-cover' />
            <span className='font-medium' style={{ color: 'var(--text-primary)' }}>Upload profile image</span>
          </label>
          <input onChange={(e)=>setName(e.target.value)} value={name}
           type="text" required placeholder='Your name' className='w-full rounded-3xl border p-4 text-sm outline-none transition focus:ring-2' style={{ borderColor: 'var(--border-color)', backgroundColor: theme === 'light' ? '#f1f5f9' : 'rgba(30, 41, 59, 0.8)', color: 'var(--text-primary)' }}/>
           <textarea onChange={(e)=>setBio(e.target.value)} value={bio} placeholder="Write profile bio" required className="w-full rounded-3xl border p-4 text-sm outline-none transition focus:ring-2" style={{ borderColor: 'var(--border-color)', backgroundColor: theme === 'light' ? '#f1f5f9' : 'rgba(30, 41, 59, 0.8)', color: 'var(--text-primary)' }} rows={5}></textarea>

           <button type="submit" className="w-full rounded-2xl px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110" style={{ background: 'linear-gradient(to right, var(--accent-color), #a855f7)' }}>Save profile</button>
        </form>
        <div className='flex min-h-[320px] flex-1 items-center justify-center rounded-[32px] border p-6' style={{ borderColor: 'var(--border-color)', backgroundColor: theme === 'light' ? '#f1f5f9' : 'rgba(30, 41, 59, 0.8)' }}>
          <img className='max-h-[420px] w-full max-w-xs rounded-[32px] object-cover' src={selectedImg ? URL.createObjectURL(selectedImg) : authUser?.profilePic || assets.logo_icon} alt="Profile preview" />
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
