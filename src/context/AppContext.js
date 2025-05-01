import React, { createContext, useState } from 'react'

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [checked, setChecked] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  
  return (
    <AppContext.Provider
      value={{
        checked, setChecked,
        loggedIn, setLoggedIn,
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}