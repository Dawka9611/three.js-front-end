import { useContext } from 'react'
import AlertContext from '../../contexts/alert.context'
import styles from './alert.module.css'

export default function Alert() {
   const { alert, setAlert } = useContext(AlertContext)

   function close() {
      setAlert(prev => ({ ...prev, open: false }))
   }

   return alert.open
      ? <div className={styles.alert} onClick={close}>
         {alert.content}
      </div>
      : null
}
