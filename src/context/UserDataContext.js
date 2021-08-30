import React, { createContext } from 'react'

export const UserDataContext = createContext({
  userData: '',
  setUserData: () => {},
});