import { useContext, useEffect, useState } from 'react'
import { Link, useLocation, Prompt } from 'react-router-dom'
import AlertContext from '../../contexts/alert.context'
import styles from './page1.module.css'

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
   const { alert, setAlert } = useContext(AlertContext)

   const [state, setState] = useState(initialState)
   const [state1, setState1] = useState(initialState1)
   const [table, setTable] = useState([{ tableRow }])

   const [editted, setEditted] = useState(false)
   const [submitted, setSubmitted] = useState(false)
   const [filled, setUFilled] = useState(true)

   function setter(key, value) {
      setState(prev => ({ ...prev, [key]: value }))
      setEditted(true)
      value.length > 0 ? setUFilled(false) : setUFilled(true)
   }

   function setter1(key, value) {
      setState1(prev => ({ ...prev, [key]: value }))
      value.length > 0 ? setUFilled(false) : setUFilled(true)
   }

   function setterTable(key, value, index) {
      setTable(prev => {
         const next = [...prev]
         next[index][key] = value
         return next
      })
      value.length > 0 ? setUFilled(false) : setUFilled(true)
   }

   function submit() {
      setSubmitted(true)
      if (submitted && !filled) {
         window.alert('submit')
         setEditted(false)
      } else {
         setAlert({
            open: true,
            content: 'Бөглөөгүй field bna'
         })
      }
   }

   return (
      <div className={styles.container}>
         <div className={styles.form}>
            Page 1
            <div className="">
               Editted: {editted + ''}
            </div>
            <div className="">
               Submitted: {submitted + ''}
            </div>
            <Input value={state.name} setter={setter} name='name' />
            <input value={state.age ?? ''}
               onChange={e => setter('age', e.target.value)}
               className={`${styles.input} ${filled && submitted ? styles.inputfilled : ''}`}
            />
            <input value={state1.gender ?? ''}
               onChange={e => setter1('gender', e.target.value)}
               className={`${styles.input} ${filled && submitted ? styles.inputfilled : ''}`}
            />
            <input
               value={state1.height ?? ''}
               onChange={e => setter1('height', e.target.value)}
               className={`${styles.input} ${filled && submitted ? styles.inputfilled : ''}`}
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
                              className={`${styles.input} ${filled && submitted ? styles.inputfilled : ''}`}
                           />
                        </td>
                        <td>
                           <input
                              value={row.maxLoanTerm}
                              onChange={e => setterTable('maxLoanTerm', e.target.value, i)}
                              className={`${styles.input} ${filled && submitted ? styles.inputfilled : ''}`}
                           />
                        </td>
                        <td>
                           <input
                              value={row.currentCondition}
                              onChange={e => setterTable('currentCondition', e.target.value, i)}
                              className={`${styles.input} ${filled && submitted ? styles.inputfilled : ''}`}
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
            <Link to='/page2'>
               Page2
            </Link>
         </div>
      </div>
   )
}

function Input(value, name, index, setter) {
   return (
      <div>
         <input
            value={value ?? ''}
            onChange={e => setter(name, e.target.value, index)}
            className={styles.input}
         />
      </div>
   )
}