import React, { createContext, useState } from 'react'

export const UserDataContext = createContext();

export const UserDataContextProvider = (props) => {
  const [userData, setUserData] = useState('')
  
  return (
    <UserDataContext.Provider
      value={{
        userData, setUserData
      }}
    >
      {props.children}
    </UserDataContext.Provider>
  )
}