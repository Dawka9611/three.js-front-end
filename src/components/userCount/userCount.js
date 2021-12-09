import { Link } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import styles from './userCount.module.css'

export default function UserCount({ count }) {

   return (
      <div className={styles.container}>
         <div>
            Хэрэглэгчийн тоо: {count}
         </div>
         <div>
            {/* <Link>
               page1
            </Link>
            <Link>
               page2
            </Link> */}
         </div>
      </div>
   )
}