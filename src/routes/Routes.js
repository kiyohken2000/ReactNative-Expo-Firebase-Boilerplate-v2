import React from 'react'
import { useSelector } from 'react-redux'
import Main from './navigation'
import Initial from '../scenes/initial/Initial'

const Routes = () => {
  const { checked, loggedIn } = useSelector((state) => state.app)

  // TODO: switch router by loggedIn state
  console.log('[##] loggedIn', loggedIn)

  // rendering
  if (!checked) {
    return <Initial />
  }

  return <Main />
}

export default Routes
