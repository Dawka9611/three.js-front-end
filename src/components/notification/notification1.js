import { useEffect, useRef, useState } from 'react'
import styles from './notification.module.css'
import { MdNotificationsActive } from 'react-icons/md'
import { animated, Spring } from 'react-spring'
import socket from '../../websocket'

export default function Notification1() {
   const [data, setData] = useState()

   useEffect(() => {
      fetch('http://192.168.88.225:4000/users', {
         method: 'get'
      }).then(res => res.json())
         .then(data => setData(data))
   }, [])

   const [open, setOpen] = useState(false)

   const buttonRef = useRef()
   const dropdownRef = useRef()

   function openNotification() {
      setOpen(prev => !prev)
   }

   return (
      <div className={styles.container}>
         <button className={styles.button} onClick={openNotification} ref={buttonRef}>
            <MdNotificationsActive className={styles.icon} />
         </button>
         <Spring
            from={{ height: 0, opacity: 0 }}
            to={open ? { height: dropdownRef.height + 10, opacity: 1 } : { height: 0, opacity: 0 }}
         >
            {anims =>
               < animated.div ref={dropdownRef} style={anims}>
                  <div className={styles.notificatioContainer}>
                     Шинэ хэрэглэгч нэмэгдлээ
                  </div>
               </animated.div >
            }
         </Spring >
      </div >
   )
}