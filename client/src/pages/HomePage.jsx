import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import RightSidebar from '../components/RightSidebar'
import { useContext } from 'react'
import { ChatContext } from '../../context/ChatContext'
import { ThemeContext } from '../../context/ThemeContext'

const HomePage = () => {

    const {selectedUser} = useContext(ChatContext)
    const { theme } = useContext(ThemeContext)

  return (
    <div className='min-h-screen px-4 py-6' style={{ backgroundColor: theme === 'light' ? '#f8fafc' : 'transparent' }}>
      <div className={`mx-auto h-[calc(100vh-3rem)] max-h-[100dvh] max-w-[1400px] overflow-hidden rounded-[32px] border shadow-2xl backdrop-blur-3xl grid grid-cols-1 relative ${selectedUser ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]' : 'md:grid-cols-2'}`} style={{ borderColor: theme === 'light' ? '#cbd5e1' : 'rgba(51, 65, 85, 0.5)', backgroundColor: theme === 'light' ? '#f1f5f9' : 'rgba(15, 23, 42, 0.6)', boxShadow: theme === 'light' ? '0 25px 50px -12px rgba(0, 0, 0, 0.1)' : '0 25px 50px -12px rgba(0, 0, 0, 0.3)' }}>
        <Sidebar />
        <ChatContainer />
        <RightSidebar />
      </div>
    </div>
  )
}

export default HomePage
