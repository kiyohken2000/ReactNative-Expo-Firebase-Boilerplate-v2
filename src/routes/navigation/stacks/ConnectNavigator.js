import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { ColorSchemeContext } from '../../../context/ColorSchemeContext'
import { lightProps, darkProps } from './navigationProps/navigationProps'

import { FolloFollowerNavigator } from '../toptabs/follofollowerNavigator'

const Stack = createStackNavigator()

export const ConnectNavigator = () => {
  const { scheme } = useContext(ColorSchemeContext)
  const navigationProps = scheme === 'dark' ? darkProps:lightProps
  return (
    <Stack.Navigator screenOptions={navigationProps}>
      <Stack.Screen
        name="Connect"
        component={FolloFollowerNavigator}
      />
    </Stack.Navigator>
  )
}