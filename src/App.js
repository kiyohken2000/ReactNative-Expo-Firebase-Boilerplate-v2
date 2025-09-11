import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'utils/ignore'
import { ColorSchemeContextProvider } from './context/ColorSchemeContext'
import { UserDataContextProvider } from './context/UserDataContext'
import { AppContextProvider } from './context/AppContext'

// assets
import { imageAssets } from 'theme/images'
import { fontAssets } from 'theme/fonts'
import Router from './routes'

const isHermes = () => !!global.HermesInternal;

const App = () => {
  // state
  const [didLoad, setDidLoad] = useState(false)
  console.log('isHermes', isHermes())

  // handler
  const handleLoadAssets = async () => {
    // assets preloading
    await Promise.all([...imageAssets, ...fontAssets])
    setDidLoad(true)
  }

  // lifecycle
  useEffect(() => {
    handleLoadAssets()
  }, [])

  // rendering
  if (!didLoad) return <View />
  return (
    <SafeAreaProvider>
      <AppContextProvider>
        <ColorSchemeContextProvider>
          <UserDataContextProvider>
            <Router />
          </UserDataContextProvider>
        </ColorSchemeContextProvider>
      </AppContextProvider>
    </SafeAreaProvider>
  )
}

export default App
