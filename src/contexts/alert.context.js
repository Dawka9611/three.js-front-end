import { createContext, useMemo, useState } from "react"

const AlertContext = createContext()

export function AlertStore({ children }) {
   const [alert, setAlert] = useState({
      open: false,
      content: ''
   })

   const value = useMemo(() => ({ alert, setAlert }), [alert])

   return (
      <AlertContext.Provider value={value}>
         {children}
      </AlertContext.Provider>
   )
}

export default AlertContext
