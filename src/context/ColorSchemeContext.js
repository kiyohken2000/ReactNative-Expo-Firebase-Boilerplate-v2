import React, { createContext } from 'react'

export const ColorSchemeContext = createContext({
  scheme: '',
  setScheme: () => {},
});