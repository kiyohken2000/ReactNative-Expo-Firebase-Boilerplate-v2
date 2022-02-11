import React, { useState, useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { HomeTitleContext } from '../../../context/HomeTitleContext'
import { ColorSchemeContext } from '../../../context/ColorSchemeContext'
import { lightProps, darkProps } from './navigationProps/navigationProps'
import HeaderStyle from './headerComponents/HeaderStyle'

import Home from '../../../scenes/home'
import Detail from '../../../scenes/detail'

const Stack = createStackNavigator()

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
            <Stack.Screen
              name="Home"
              component={Home}
              options={({ navigation }) => ({
                headerBackground: scheme === 'dark' ? null: () => <HeaderStyle />,
              })}
            />
            <Stack.Screen
              name="Detail"
              component={Detail}
              options={{ 
                title: ctx.title,
                headerBackground: scheme === 'dark' ? null: () => <HeaderStyle />,
              }}
            />
          </Stack.Navigator>
      )}
      </HomeTitleContext.Consumer>
    </HomeTitleContext.Provider>
  )
}