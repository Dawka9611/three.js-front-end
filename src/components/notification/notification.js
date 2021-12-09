import { useEffect, useRef, useState } from 'react'
import { AiTwotoneNotification } from 'react-icons/ai'
import styles from './notification.module.css'
import { animated, Spring } from 'react-spring'
import { Link } from 'react-router-dom'

export default function Notification({ noticeCount }) {
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
   const containerRef = useRef()

   function openNotification() {
      setOpen(prev => !prev)
   }

   return (
      <div className={styles.container}>
         <button className={styles.button} onClick={openNotification} ref={buttonRef}>
            <AiTwotoneNotification className={styles.icon} />
            <div>{noticeCount}</div>
         </button>
         <div>
            <Link to="/page1" className={styles.link}>
               Page1
            </Link>
         </div>
         <div>
            <Link to="/page2" className={styles.link}>
               Page2
            </Link>
         </div>
         <Spring
            from={{ height: 0, opacity: 0 }}
            to={open ? { height: containerRef.height + 10, opacity: 1 } : { height: 0, opacity: 0 }}
         >
            {anims =>
               < animated.div ref={dropdownRef} style={anims}>
                  <div className={styles.notificatioContainer} ref={containerRef}>
                     {/* {data.map((el, i) => {
                        return (
                           <div key={i} className={styles.infoContainer}>
                              <div>
                                 Name: {el.name}
                              </div>
                              <div>
                                 Email: {el.email}
                              </div>
                              {el.gender ?
                                 <div>
                                    Gender: {el.gender}
                                 </div>
                                 : ''
                              }
                           </div>
                        )
                     })} */}
                  </div>
               </animated.div >
            }
         </Spring >
      </div >
   )
}