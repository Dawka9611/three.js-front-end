import React, { useContext, useEffect, useState } from 'react'
import './App.css'
import UserCount from './components/userCount/userCount'
import AnimatedDots from './components/dots/dots'
import Notification from './components/notification/notification'
import socket from './websocket'
import { toast } from 'react-toastify';
import { BrowserRouter as Router } from 'react-router-dom'
import PageRouter from './router'
import AlertContext, { AlertStore } from './contexts/alert.context'
import { context } from '@react-three/fiber'
import Alert from './components/alert/alert'
import Prompt from './components/prompt/prompt'

toast.configure()

export default function App() {
   const { setAlert } = useContext(AlertContext)

   const [count, setCount] = useState()
   const [noticeCount, setNoticeCount] = useState()
   const [confirmOpen, setConfirmOpen] = useState(true)

   useEffect(() => {
      fetch('http://192.168.88.225:4000/users', {
         method: 'get'
      }).then(res => res.json())
         .then(data => setCount(data.length))
   }, [])

   useEffect(() => {
      socket.on('user added', data => {
         console.log(data)
         setCount(prev => prev + 1)
         // setNoticeCount(prev => prev + 1)
         const notify = () => {
            toast.info(`${data.name} нэртэй шинэ хэрэглэгч нэмэгдлээ.`, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: false })
         }
         notify()
      })
      return () => socket.disconnect()
   }, [])

   return (
      <Router
         getUserConfirmation={(message, callback) => {
            setAlert({
               open: true,
               content: <Prompt message={message} callback={callback} />
            })
         }}
      >
         <Alert />
         <div className="App">
            <Notification noticeCount={noticeCount} />
            <PageRouter />
            {/* <AnimatedDots /> */}
            <UserCount />
         </div>
      </Router>
   )
}
