import { useContext, useState } from 'react'
import { Link, Prompt } from 'react-router-dom'
import AlertContext from '../../contexts/alert.context'
import styles from './page1.module.css'
import { BsExclamation } from 'react-icons/bs'

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
   const [submitted, setSubmitted] = useState(false)
   const [validate, setValidate] = useState(false)

   const validSet = new Set()
   console.log(validSet)

   function setter(key, value) {
      setState(prev => ({ ...prev, [key]: value }))
      setEditted(true)
      validSet.add(state.name)
      validSet.add(state.age)
      console.log(validSet)
   }

   function setter1(key, value) {
      setState1(prev => ({ ...prev, [key]: value }))
      setEditted(true)
      validSet.add(state1.gender)
      validSet.add(state1.height)
      console.log(validSet)
   }

   function setterTable(key, value, index) {
      setTable(prev => {
         const next = [...prev]
         next[index][key] = value
         return next
      })
      setEditted(true)
   }

   function submit() {
      setValidate(true)

      let valid = true
      valid = valid && !Object.values(state).some(value => [null, undefined, ''].includes(value))
      valid = valid && !Object.values(state1).some(value => [null, undefined, ''].includes(value))

      if (valid) {
         window.alert('submitted')
         setSubmitted(true)
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
            <Input value={state.name} setter={setter} name='name' validate={validate} />
            <Input value={state.age} setter={setter} name='age' validate={validate} />
            <Input value={state1.gender} setter={setter1} name='gender' validate={validate} />
            <Input value={state1.height} setter={setter1} name='height' validate={validate} />
            <table className={styles.table}>
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
                           <Input value={row.buyerName} setter={setterTable} name='buyerName' index={i} />
                        </td>
                        <td>
                           <Input value={row.maxLoanTerm} setter={setterTable} name='maxLoanTerm' index={i} />
                        </td>
                        <td>
                           <Input value={row.currentCondition} setter={setterTable} name='currentCondition' index={i} />
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

export function Input({ value, name, index, setter, style, validate,
   invalidValues = [null, undefined, '']
}) {
   return (
      <div>
         <div className={styles.inputConatiner}>
            {validate && invalidValues.includes(value) && <BsExclamation className={styles.icon} />}
            <input
               value={value ?? ''}
               onChange={e => setter(name, e.target.value, index)}
               className={validate && invalidValues.includes(value) ? styles.inputUnfilled : ''}
            />
         </div>

      </div>
   )
}
