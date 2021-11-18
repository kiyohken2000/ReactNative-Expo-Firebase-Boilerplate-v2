import React, { useState, useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { HomeTitleContext } from '../../../context/HomeTitleContext'
import { ColorSchemeContext } from '../../../context/ColorSchemeContext'

// ------------------------------------
// Scenes
// ------------------------------------
import Login from '../../../scenes/login'
import Registration from '../../../scenes/registration'
import Home from '../../../scenes/home'
import Detail from '../../../scenes/detail'
import Profile from '../../../scenes/profile'
import Edit from '../../../scenes/edit'
import Post from '../../../scenes/post'

// ------------------------------------
// Constants
// ------------------------------------

const Stack = createStackNavigator()
const RootStack = createStackNavigator();

// ------------------------------------
// Navigators
// ------------------------------------

export const LoginNavigator = () => {
  const { navigationProps } = useContext(ColorSchemeContext)
  return (
    <Stack.Navigator screenOptions={navigationProps}>
      <Stack.Screen
        name="Login"
        component={Login}
      />
      <Stack.Screen
        name="Registration"
        component={Registration}
      />
    </Stack.Navigator>
  )
}

export const HomeNavigator = () => {
  const { navigationProps } = useContext(ColorSchemeContext)
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

export const ProfileNavigator = () => {
  const { navigationProps } = useContext(ColorSchemeContext)
  return (
    <Stack.Navigator screenOptions={navigationProps}>
      <RootStack.Group>
        <Stack.Screen
          name="Profile"
          component={Profile}
        />
        <Stack.Screen
          name="Edit"
          component={Edit}
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