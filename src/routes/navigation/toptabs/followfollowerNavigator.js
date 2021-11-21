import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { screenOptions } from './navigationProps/navigationProps'

import { FollowNavigator } from '../stacks/topTabStacks/FollowNavigator'
import { FollowerNavigator } from '../stacks/topTabStacks/FollowerNavigator'

const Tab = createMaterialTopTabNavigator()

export const FollowFollowerNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="FollowTab"
      screenOptions={screenOptions}
    >
      <Tab.Screen
        name="FollowTab"
        component={FollowNavigator}
        options={{ tabBarLabel: 'Follow' }}
      />
      <Tab.Screen
        name="FollowerTab"
        component={FollowerNavigator}
        options={{ tabBarLabel: 'Follower' }}
      />
    </Tab.Navigator>
  )
}