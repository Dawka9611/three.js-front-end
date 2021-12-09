import { useContext, useState } from 'react'
import { Link, Prompt } from 'react-router-dom'
import AlertContext from '../../contexts/alert.context'
import styles from './page2.module.css'

const initialState = {
   name: null,
   age: null
}

const initialState1 = {
   gender: null,
   height: null
}

export const receivablesReportHeaders = [
   'Нэр',
   'Зээлийн хугацаа',
   'Одоогийн нөхцөл'
]

export const tableRow = {
   buyerName: null,
   maxLoanTerm: null,
   currentCondition: null,
}

export default function Page1() {
   const { setAlert } = useContext(AlertContext)

   const [state, setState] = useState(initialState)
   const [state1, setState1] = useState(initialState1)
   const [table, setTable] = useState([{ tableRow }])

   const [editted, setEditted] = useState(false)
   const [filled, setFilled] = useState(false)
   const [submitted, setSubmitted] = useState(false)

   function setter(key, value) {
      setState(prev => ({ ...prev, [key]: value }))
      setEditted(true)
      value.length > 0 ? setFilled(true) : setFilled(false)
   }

   function setter1(key, value) {
      setState1(prev => ({ ...prev, [key]: value }))
      setEditted(true)
      value.length > 0 ? setFilled(true) : setFilled(false)
   }

   function setterTable(key, value, index) {
      setTable(prev => {
         const next = [...prev]
         next[index][key] = value
         return next
      })
      setEditted(true)
      value.length > 0 ? setFilled(true) : setFilled(false)
   }

   function submit() {
      setSubmitted(true)
      if (submitted) {
      if (filled === true) {
         window.alert('Submitted');
         setEditted(false)
      } else {
         setAlert({
            open: true,
            content: 'Bogloogui input bna'
         })
      }
      }
   }

   return (
      <div className={styles.container}>
         <div className={styles.form}>
            Page 2
            <input
               value={state.name ?? ''}
               onChange={e => setter('name', e.target.value)}
               className={`${styles.input} ${!filled && submitted ? styles.inputUnfilled : ''}`}
            />
            <input value={state.age ?? ''}
               onChange={e => setter('age', e.target.value)}
               className={`${styles.input} ${!filled && submitted ? styles.inputUnfilled : ''}`}
            />
            <input value={state1.gender ?? ''}
               onChange={e => setter1('gender', e.target.value)}
               className={`${styles.input} ${!filled && submitted ? styles.inputUnfilled : ''}`}
            />
            <input
               value={state1.height ?? ''}
               onChange={e => setter1('height', e.target.value)}
               className={`${styles.input} ${!filled && submitted ? styles.inputUnfilled : ''}`}
            />
            <table>
               <thead>
                  <tr>
                     {receivablesReportHeaders.map(headers =>
                        <th key={headers}>
                           {headers}
                        </th>
                     )}
                  </tr>
               </thead>
               <tbody>
                  {table.map((row, i) =>
                     <tr key={i}>
                        <td>
                           <input
                              value={row.buyerName}
                              onChange={e => setterTable('buyerName', e.target.value, i)}
                              className={`${styles.input} ${!filled && submitted ? styles.inputUnfilled : ''}`}
                           />
                        </td>
                        <td>
                           <input
                              value={row.maxLoanTerm}
                              onChange={e => setterTable('maxLoanTerm', e.target.value, i)}
                              className={`${styles.input} ${!filled && submitted ? styles.inputUnfilled : ''}`}
                           />
                        </td>
                        <td>
                           <input
                              value={row.currentCondition}
                              onChange={e => setterTable('currentCondition', e.target.value, i)}
                              className={`${styles.input} ${!filled && submitted ? styles.inputUnfilled : ''}`}
                           />
                        </td>
                     </tr>
                  )}

               </tbody>
            </table>
            <div className={styles.buttonConatiner}>
               <button onClick={submit}>
                  Submit
               </button>
            </div>
            <Prompt
               when={editted}
               message="Hadgalaagui change bna?"
            />
            <Link to='/page1'>
               Page1
            </Link>
         </div>
      </div>
   )
}
