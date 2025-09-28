import React, { Children } from 'react'
import { createContext } from 'react'

export const authDataContext = createContext()

function authContext({children}) {
    let serverUrl = "https://task3-2gbi.onrender.com"

    let value = {
        serverUrl
    }

  return (
    <>
    <authDataContext.Provider value={value}>
        {children}
    </authDataContext.Provider>
    </>
  )
}

export default authContext
