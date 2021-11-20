import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { ColorSchemeContext } from '../../../context/ColorSchemeContext'
import { lightProps, darkProps } from './navigationProps/navigationProps'

import { FollowFollowerNavigator } from '../toptabs/followfollowerNavigator'
import Post from '../../../scenes/post'

const Stack = createStackNavigator()
const RootStack = createStackNavigator()

export const ConnectNavigator = () => {
  const { scheme } = useContext(ColorSchemeContext)
  const navigationProps = scheme === 'dark' ? darkProps:lightProps
  return (
    <Stack.Navigator screenOptions={navigationProps}>
      <RootStack.Group>
        <Stack.Screen
          name="Connect"
          component={FollowFollowerNavigator}
        />
      </RootStack.Group>
      <RootStack.Group
        screenOptions={{
          presentation: 'modal',
          headerShown: false
        }}>
        <RootStack.Screen
          name="Post"
          component={Post}
        />
      </RootStack.Group>
    </Stack.Navigator>
  )
}