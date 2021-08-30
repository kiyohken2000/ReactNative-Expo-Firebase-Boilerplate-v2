import React, { useEffect, useState, useCallback, createContext } from 'react'

export const UserDataContext = createContext({
  userData: '',
  setUserData: () => {},
});