import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { ColorSchemeContext } from '../../../context/ColorSchemeContext'
import { UserDataContext } from '../../../context/UserDataContext'

import { lightProps, darkProps } from './navigationProps/navigationProps'
import HeaderStyle from './headerComponents/HeaderStyle'
import HeaderRightButton from '../../../components/HeaderRightButton'

import { FollowFollowerNavigator } from '../toptabs/followfollowerNavigator'

const Stack = createStackNavigator()
const RootStack = createStackNavigator()

export const ConnectNavigator = () => {
  const { scheme } = useContext(ColorSchemeContext)
  const { userData } = useContext(UserDataContext)
  const navigationProps = scheme === 'dark' ? darkProps:lightProps

  return (
    <Stack.Navigator screenOptions={navigationProps}>
      <RootStack.Group>
        <Stack.Screen
          name="Connect"
          component={FollowFollowerNavigator}
          options={({ navigation }) => ({
            headerBackground: scheme === 'dark' ? null: () => <HeaderStyle />,
            headerRight: () => <HeaderRightButton from='Connect' userData={userData} />
          })}
        />
      </RootStack.Group>
    </Stack.Navigator>
  )
}