import React, { useState, useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { HomeTitleContext } from '../../../context/HomeTitleContext'
import { ColorSchemeContext } from '../../../context/ColorSchemeContext'
import { lightProps, darkProps } from './navigationProps/navigationProps'

import Home from '../../../scenes/home'
import Detail from '../../../scenes/detail'
import Post from '../../../scenes/post'

const Stack = createStackNavigator()
const RootStack = createStackNavigator()

export const HomeNavigator = () => {
  const { scheme } = useContext(ColorSchemeContext)
  const navigationProps = scheme === 'dark' ? darkProps:lightProps
  const [title, setTitle] = useState('default title')
  return (
    <HomeTitleContext.Provider
      value={{
        title,
        setTitle,
      }}
    >
      <HomeTitleContext.Consumer>
        {(ctx) => (
          <Stack.Navigator screenOptions={navigationProps}>
            <RootStack.Group>
              <Stack.Screen
                name="Home"
                component={Home}
              />
              <Stack.Screen
                name="Detail"
                component={Detail}
                options={{ title: ctx.title }}
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
      )}
      </HomeTitleContext.Consumer>
    </HomeTitleContext.Provider>
  )
}