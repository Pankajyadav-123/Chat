import React, { useContext, useEffect, useState } from 'react'
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { ThemeContext } from '../../context/ThemeContext';

const Sidebar = () => {

    const {getUsers, users, selectedUser, setSelectedUser,
        unseenMessages, setUnseenMessages } = useContext(ChatContext);

    const {logout, onlineUsers, authUser} = useContext(AuthContext)
    const { theme, toggleTheme } = useContext(ThemeContext)

    const [input, setInput] = useState("")
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const navigate = useNavigate();

    const filteredUsers = input ? users.filter((user)=>user.fullName.toLowerCase().includes(input.toLowerCase())) : users;

    useEffect(()=>{
        getUsers();
    },[onlineUsers])

  return (
    <div className={`h-full overflow-y-auto rounded-r-3xl border-r shadow-xl backdrop-blur-xl ${selectedUser ? "max-md:hidden" : ''}`} style={{ borderColor: 'var(--border-color)', backgroundColor: theme === 'light' ? 'rgba(248, 250, 252, 0.95)' : 'rgba(15, 23, 42, 0.5)', color: 'var(--text-primary)' }}>
      <div className='pb-6'>
        <div className='flex items-center justify-between gap-3'>
            <div className='flex items-center gap-3'>
<div className='flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg p-1.5' style={{ backgroundColor: theme === 'light' ? '#e2e8f0' : 'rgba(30, 41, 59, 0.5)', boxShadow: theme === 'light' ? '0 4px 6px rgba(0, 0, 0, 0.1)' : '0 4px 6px rgba(0, 0, 0, 0.5)' }}>
                <img src={assets.logo_big} alt="NovaChat" className='h-full w-full object-contain' />
              </div>
              <div>
                <p className='text-lg font-semibold' style={{ color: 'var(--text-primary)' }}>ChatLoop</p>
                <p className='text-xs' style={{ color: 'var(--text-secondary)' }}>Connect faster.</p>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <button 
                onClick={toggleTheme}
                className='rounded-full p-2 transition duration-200'
                style={{ 
                  backgroundColor: theme === 'light' ? '#e2e8f0' : 'rgba(30, 41, 59, 0.8)',
                  color: 'var(--text-primary)',
                }}
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
              <div className="relative py-2 group" onMouseLeave={() => setDropdownOpen(false)}>
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className='flex items-center gap-2 rounded-3xl border px-3 py-2 text-sm transition' style={{ borderColor: 'var(--border-color)', backgroundColor: theme === 'light' ? '#f8fafc' : 'rgba(15, 23, 42, 0.8)', color: 'var(--text-primary)' }}>
                    <img src={authUser?.profilePic || assets.avatar_icon} alt="User" className='h-6 w-6 rounded-full object-cover' />
                    <span className='hidden sm:inline-block'>{authUser?.fullName || 'You'}</span>
                </button>
                <div style={{ borderColor: 'var(--border-color)', backgroundColor: theme === 'light' ? '#f1f5f9' : 'rgba(15, 23, 42, 0.95)', color: 'var(--text-primary)', opacity: dropdownOpen ? 1 : 0, visibility: dropdownOpen ? 'visible' : 'hidden', pointerEvents: dropdownOpen ? 'auto' : 'none' }} className='absolute right-0 top-full z-20 w-44 rounded-3xl border shadow-lg p-4 text-sm transition duration-300 group-hover:opacity-100 group-hover:visible md:group-hover:opacity-100 md:group-hover:visible'>
                    <p onClick={()=>{navigate('/profile'); setDropdownOpen(false)}} className='cursor-pointer rounded-xl px-2 py-1 transition' style={{ color: 'var(--text-primary)' }} onMouseEnter={(e) => e.target.style.backgroundColor = theme === 'light' ? '#e2e8f0' : 'rgba(30, 41, 59, 0.8)'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>Edit Profile</p>
                    <hr className="my-3" style={{ borderColor: 'var(--border-color)' }} />
                    <p onClick={()=>{logout(); setDropdownOpen(false)}} className='cursor-pointer rounded-xl px-2 py-1 transition' style={{ color: 'var(--text-primary)' }} onMouseEnter={(e) => e.target.style.backgroundColor = theme === 'light' ? '#e2e8f0' : 'rgba(30, 41, 59, 0.8)'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>Logout</p>
                </div>
              </div>
            </div>
        </div>

        <div className='mt-6 rounded-3xl border px-4 py-3 shadow-inner transition' style={{ borderColor: theme === 'light' ? '#cbd5e1' : 'rgba(51, 65, 85, 0.8)', backgroundColor: theme === 'light' ? '#f1f5f9' : 'rgba(15, 23, 42, 0.8)' }}>
            <div className='flex items-center gap-3'>
                <img src={assets.search_icon} alt="Search" className='w-4 opacity-80'/>
                <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" className='w-full bg-transparent border-none text-sm outline-none' style={{ color: 'var(--text-primary)' }} placeholder='Search users...' />
            </div>
        </div>
      </div>

    <div className='flex flex-col gap-3'>
        {filteredUsers.map((user, index)=>(
            <div onClick={()=> {setSelectedUser(user); setUnseenMessages(prev=> ({...prev, [user._id]:0}))}}
             key={index} className={`relative flex cursor-pointer items-center gap-3 rounded-3xl border p-3 transition duration-200`} style={{ backgroundColor: selectedUser?._id === user._id ? (theme === 'light' ? '#e2e8f0' : 'rgba(30, 41, 59, 0.8)') : (theme === 'light' ? '#f1f5f9' : 'rgba(15, 23, 42, 0.8)'), borderColor: selectedUser?._id === user._id ? '#4f46e5' : 'transparent', color: 'var(--text-primary)' }}>
                <img src={user?.profilePic || assets.avatar_icon} alt="" className='h-12 w-12 rounded-full object-cover'/>
                <div className='flex-1 min-w-0'>
                    <p className='truncate text-sm font-medium'>{user.fullName}</p>
                    <p className={`mt-1 text-xs`} style={{ color: onlineUsers.includes(user._id) ? '#10b981' : 'var(--text-secondary)' }}>
                      <span className={`mr-1 inline-block h-2 w-2 rounded-full`} style={{ backgroundColor: onlineUsers.includes(user._id) ? '#10b981' : '#94a3b8' }}></span>
                      {onlineUsers.includes(user._id) ? 'Online' : 'Offline'}
                    </p>
                </div>
                {unseenMessages[user._id] > 0 && <span className='absolute right-4 top-5 inline-flex h-6 min-w-[24px] items-center justify-center rounded-full bg-violet-500 text-[11px] font-semibold text-white'>{unseenMessages[user._id]}</span>}
            </div>
        ) )}
    </div>

    </div>
  )
}

export default Sidebar
