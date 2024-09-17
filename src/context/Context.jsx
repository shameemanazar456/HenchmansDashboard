import React, { createContext, useState } from 'react'

export const loginContext = createContext()
export const totalGrievanceContext = createContext()
export const pendingGrievanceContext = createContext()
export const completedGrievanceContext = createContext()
export const statusContext = createContext()
export const grievanceListContext = createContext()
export const updateContext = createContext()



function Context({children}) {
    const [grievancescontext, setGrievancesContext] = useState([])
    const [isUpdate, setIsUpdate] = useState(true)

    const   [isLogin, setIsLogin] = useState(false)
    const   [totalGrievances, setTotalGrievances] = useState(0)
    const   [pendingGrievances, setPendingGrievances] = useState(0)
    const   [CompletedGrievances, setCompletedGrievances] = useState(0)
    const   [status, setStatus] = useState("")



  return (
    
    <grievanceListContext.Provider value={{grievancescontext,setGrievancesContext}}>
        <statusContext.Provider value={{status, setStatus}}>
            <completedGrievanceContext.Provider value={{CompletedGrievances,setCompletedGrievances}}>
                <pendingGrievanceContext.Provider value={{pendingGrievances,setPendingGrievances}}>
                    <totalGrievanceContext.Provider value={{totalGrievances,setTotalGrievances}}>
                        <loginContext.Provider value={{isLogin, setIsLogin}}>
                            <updateContext.Provider value={{isUpdate, setIsUpdate}}>{children}</updateContext.Provider>
                        </loginContext.Provider>
                    </totalGrievanceContext.Provider>
                </pendingGrievanceContext.Provider>
            </completedGrievanceContext.Provider>
        </statusContext.Provider>
    </grievanceListContext.Provider>
    
  )
}

export default Context
