import React, { createContext } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { authDataContext } from './AuthContext'
import axios from 'axios'
import { useEffect } from 'react'

export const adminDataContext = createContext()
function AdminContext({children}) {
    let [adminData, setAdminData] = useState(null)
    let {serverUrl} = useContext(authDataContext)

    let getAdmin = async() =>{
      try{
      let result = await axios.get(serverUrl+"/api/user/getadmin",{withCredentials:true})
      setAdminData(result.data)
      console.log(result.data);
      }catch(error){
        setAdminData(null)
        console.log(error)
      }
    }

    useEffect(()=>{
      getAdmin()
    },[])

    let value = {
      adminData, setAdminData, getAdmin
    }
  return (
    <>
    <adminDataContext.Provider value={value}>
        {children}
    </adminDataContext.Provider>
    </>
  )
}

export default AdminContext