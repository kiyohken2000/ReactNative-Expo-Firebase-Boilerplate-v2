import React, { useEffect, useState, useCallback, useContext } from 'react'

export const HomeTitleContext = React.createContext({
  title: 'default title',
  setTitle: () => {},
});