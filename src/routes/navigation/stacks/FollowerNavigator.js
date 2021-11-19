import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Follower from '../../../scenes/follower'
import Post from '../../../scenes/post'

const Stack = createStackNavigator()
const RootStack = createStackNavigator()

export const FollowerNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={({ route, navigation }) => ({
        headerShown: false,
      })}
    >
      <RootStack.Group>
        <Stack.Screen
          name="Follower"
          component={Follower}
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