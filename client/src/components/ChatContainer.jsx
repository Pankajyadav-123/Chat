import React, { useContext, useEffect, useRef, useState } from 'react'
import assets from '../assets/assets'
import { formatMessageTime } from '../lib/utils'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'
import { ThemeContext } from '../../context/ThemeContext'

const ChatContainer = () => {

    const { messages, selectedUser, setSelectedUser, sendMessage, 
        getMessages} = useContext(ChatContext)

    const { authUser, onlineUsers} = useContext(AuthContext)
    const { theme } = useContext(ThemeContext)

    const scrollEnd = useRef()

    const [input, setInput] = useState('');

    // Handle sending a message
    const handleSendMessage = async (e)=>{
        e.preventDefault();
        if(input.trim() === "") return null;
        await sendMessage({text: input.trim()});
        setInput("")
    }

    // Handle sending an image
    const handleSendImage = async (e) =>{
        const file = e.target.files[0];
        if(!file || !file.type.startsWith("image/")){
            return;
        }
        const reader = new FileReader();

        reader.onloadend = async ()=>{
            await sendMessage({image: reader.result})
            e.target.value = ""
        }
        reader.readAsDataURL(file)
    }

    useEffect(() => {
        if (selectedUser) {
            getMessages(selectedUser._id);
        }
    }, [selectedUser]);

    useEffect(()=>{
        if(scrollEnd.current && messages){
            scrollEnd.current.scrollIntoView({ behavior: "smooth"})
        }
    },[messages])

  return selectedUser ? (
    <div className='relative flex h-full flex-col overflow-hidden rounded-3xl border shadow-inner backdrop-blur-xl' style={{ borderColor: 'var(--border-color)', backgroundColor: theme === 'light' ? 'rgba(248, 250, 252, 0.6)' : 'rgba(15, 23, 42, 0.6)', color: 'var(--text-primary)' }}>
      {/* ------- header ------- */}
      <div className='flex items-center gap-3 border-b px-5 py-4' style={{ borderColor: 'var(--border-color)', backgroundColor: theme === 'light' ? '#f1f5f9' : 'rgba(15, 23, 42, 0.8)' }}>
        <img src={selectedUser.profilePic || assets.avatar_icon} alt="" className="h-11 w-11 rounded-full object-cover"/>
        <div className='flex-1'>
          <p className='text-lg font-semibold' style={{ color: 'var(--text-primary)' }}>{selectedUser.fullName}</p>
          <p className={`text-sm`} style={{ color: onlineUsers.includes(selectedUser._id) ? '#10b981' : 'var(--text-secondary)' }}>{onlineUsers.includes(selectedUser._id) ? 'Online now' : 'Offline'}</p>
        </div>
        <div className='flex items-center gap-3'>
          <img onClick={()=> setSelectedUser(null)} src={assets.arrow_icon} alt="Back" className='h-6 w-6 cursor-pointer rounded-full p-1 transition md:hidden' style={{ borderColor: 'var(--border-color)', border: '1px solid', color: 'var(--text-primary)' }} />
          <img src={assets.help_icon} alt="Help" className='hidden h-5 w-5 md:block opacity-80' />
        </div>
      </div>
      {/* ------- chat area ------- */}
      <div className='flex flex-1 flex-col gap-4 overflow-y-auto px-5 py-4' style={{ backgroundColor: theme === 'light' ? '#f8fafc' : 'rgba(15, 23, 42, 0.5)' }}>
        {messages.map((msg, index)=>(
            <div key={index} className={`group flex gap-3 ${msg.senderId === authUser._id ? 'justify-end' : 'justify-start'}`}>
                <div className='flex flex-col items-center gap-2 text-xs' style={{ color: 'var(--text-secondary)' }}>
                    <img src={msg.senderId === authUser._id ? authUser?.profilePic || assets.avatar_icon : selectedUser?.profilePic || assets.avatar_icon} alt="" className='h-9 w-9 rounded-full object-cover' style={{ borderColor: 'var(--border-color)', border: '1px solid' }} />
                    <p>{formatMessageTime(msg.createdAt)}</p>
                </div>

                <div className='relative flex flex-col'>
                  {msg.image ? (
                    <div className='relative group/img'>
                      <img src={msg.image} alt="" className='max-w-[260px] rounded-[28px] object-cover shadow-lg' style={{ borderColor: 'var(--border-color)', border: '1px solid' }} />
                    </div>
                ) : msg.video ? (
                    <div className='relative group/vid'>
                      <video controls src={msg.video} className='max-w-[260px] rounded-[28px] object-cover shadow-lg' style={{ borderColor: 'var(--border-color)', border: '1px solid' }} />
                    </div>
                ) : (
                    <div className={`max-w-[260px] rounded-[28px] px-4 py-3 text-sm leading-6 shadow-lg`} style={{ borderColor: msg.senderId === authUser._id ? 'transparent' : 'var(--border-color)', border: '1px solid', backgroundColor: msg.senderId === authUser._id ? 'var(--accent-color)' : (theme === 'light' ? '#e2e8f0' : 'rgba(30, 41, 59, 0.9)'), color: msg.senderId === authUser._id ? 'white' : 'var(--text-primary)' }}>
                      <p className='break-words'>{msg.text}</p>
                    </div>
                )}
                </div>
            </div>
        ))}
        <div ref={scrollEnd}></div>
      </div>

{/* ------- bottom area ------- */}
    <div className='sticky bottom-0 left-0 right-0 border-t px-5 py-4 backdrop-blur-xl' style={{ borderColor: 'var(--border-color)', backgroundColor: theme === 'light' ? 'rgba(248, 250, 252, 0.9)' : 'rgba(15, 23, 42, 0.9)' }}>
        <div className='flex items-center gap-3 rounded-full border px-4 py-3' style={{ borderColor: 'var(--border-color)', backgroundColor: theme === 'light' ? '#f1f5f9' : 'rgba(30, 41, 59, 0.8)' }}>
            <input onChange={(e)=> setInput(e.target.value)} value={input} onKeyDown={(e)=> e.key === "Enter" ? handleSendMessage(e) : null} type="text" placeholder="Send a message" 
            className='flex-1 bg-transparent text-sm outline-none' style={{ color: 'var(--text-primary)', placeholder: 'var(--text-secondary)' }} />
            <input onChange={handleSendImage} type="file" id='image' accept='image/png, image/jpeg' hidden/>
            <label htmlFor="image" className='cursor-pointer rounded-full p-2 transition' style={{ filter: theme === 'light' ? 'invert(0.7) brightness(0.8)' : 'opacity(0.8)' }}>
                <img src={assets.gallery_icon} alt="Attach" className="h-5 w-5"/>
            </label>
            <button type='button' onClick={handleSendMessage} className='inline-flex h-11 w-11 items-center justify-center rounded-full text-white transition hover:brightness-110' style={{ background: 'linear-gradient(to right, var(--accent-color), #a855f7)' }}>
                <img src={assets.send_button} alt="Send" className='h-5 w-5' />
            </button>
        </div>
    </div>


    </div>
  ) : (
    <div className='flex h-full min-h-[100vh] flex-col items-center justify-center gap-4 rounded-3xl border p-8 shadow-xl backdrop-blur-xl max-md:hidden' style={{ borderColor: 'var(--border-color)', backgroundColor: theme === 'light' ? 'rgba(248, 250, 252, 0.5)' : 'rgba(15, 23, 42, 0.5)', color: 'var(--text-secondary)' }}>
        <img src={assets.logo_icon} className='max-w-20' alt="Logo" />
        <p className='text-lg font-semibold' style={{ color: 'var(--text-primary)' }}>Chat anytime, anywhere</p>
        <p className='max-w-md text-center text-sm' style={{ color: 'var(--text-secondary)' }}>Select a conversation to begin. Your chat history and media previews will appear here.</p>
    </div>
  )
}

export default ChatContainer
