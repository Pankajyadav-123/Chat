import React, { useContext, useEffect, useState } from 'react'
import assets, { imagesDummyData } from '../assets/assets'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'
import { ThemeContext } from '../../context/ThemeContext'

const RightSidebar = () => {

    const {selectedUser, messages} = useContext(ChatContext)
    const {onlineUsers} = useContext(AuthContext)
    const { theme } = useContext(ThemeContext)
    const [msgImages, setMsgImages] = useState([])

    useEffect(()=>{
        setMsgImages(
            messages.filter(msg => msg.image).map(msg=>msg.image)
        )
    },[messages])

  return selectedUser && (
    <div className={`relative flex h-full w-full flex-col overflow-y-auto rounded-l-3xl border-l p-6 shadow-xl backdrop-blur-xl ${selectedUser ? "max-md:hidden" : ""}`} style={{ borderColor: 'var(--border-color)', backgroundColor: theme === 'light' ? 'rgba(248, 250, 252, 0.5)' : 'rgba(15, 23, 42, 0.5)', color: 'var(--text-primary)' }}>

        <div className='flex flex-col items-center gap-3 text-center'>
            <img src={selectedUser?.profilePic || assets.avatar_icon} alt="Avatar" className='h-24 w-24 rounded-full object-cover' style={{ borderColor: 'var(--border-color)', border: '1px solid' }} />
            <div>
              <h1 className='text-xl font-semibold' style={{ color: 'var(--text-primary)' }}>{selectedUser.fullName}</h1>
              <p className='mt-2 text-sm' style={{ color: 'var(--text-secondary)' }}>{selectedUser.bio || 'No bio available yet.'}</p>
            </div>
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs`} style={{ backgroundColor: onlineUsers.includes(selectedUser._id) ? 'rgba(16, 185, 129, 0.15)' : 'rgba(30, 41, 59, 0.4)', color: onlineUsers.includes(selectedUser._id) ? '#10b981' : 'var(--text-secondary)' }}>
              <span className={`h-2 w-2 rounded-full`} style={{ backgroundColor: onlineUsers.includes(selectedUser._id) ? '#10b981' : '#94a3b8' }}></span>
              {onlineUsers.includes(selectedUser._id) ? 'Online' : 'Offline'}
            </span>
        </div>

        <div className='mt-8 rounded-3xl border p-5' style={{ borderColor: 'var(--border-color)', backgroundColor: theme === 'light' ? '#f1f5f9' : 'rgba(30, 41, 59, 0.8)' }}>
            <p className='text-sm font-medium' style={{ color: 'var(--text-primary)' }}>Shared media</p>
            <div className='mt-4 grid grid-cols-2 gap-3 max-h-52 overflow-y-auto'>
                {msgImages.length > 0 ? msgImages.map((url, index)=>(
                    <div key={index} onClick={()=> window.open(url)} className='group overflow-hidden rounded-3xl border transition hover:scale-[1.01]' style={{ borderColor: 'var(--border-color)', backgroundColor: theme === 'light' ? '#e2e8f0' : 'rgba(15, 23, 42, 0.5)' }}>
                        <img src={url} alt="Shared media" className='h-28 w-full object-cover transition duration-200 group-hover:brightness-90 cursor-pointer' />
                    </div>
                )) : (
                    <div className='col-span-2 rounded-3xl border border-dashed p-6 text-center text-sm' style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>No media shared yet.</div>
                )}
            </div>
        </div>

    </div>
  )
}

export default RightSidebar
