import React, { createContext } from 'react'

export const HomeTitleContext = createContext({
  title: 'default title',
  setTitle: () => {},
});