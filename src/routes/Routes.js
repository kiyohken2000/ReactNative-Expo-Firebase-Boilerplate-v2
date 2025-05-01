import React, { useContext } from 'react'
import Main from './navigation'
import Initial from '../scenes/initial/Initial'
import { AppContext } from '../context/AppContext'

const Routes = () => {
  const { checked, loggedIn } = useContext(AppContext)

  // TODO: switch router by loggedIn state
  console.log('[##] loggedIn', loggedIn)

  // rendering
  if (!checked) {
    return <Initial />
  }

  return <Main />
}

export default Routes
