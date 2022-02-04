import React, { useState, useContext } from "react";
import { createStackNavigator } from '@react-navigation/stack'
import TabNavigator from "../tabs/Tabs";
import { ModalStacks } from "../stacks/ModalStacks/ModalStacks";

const Stack = createStackNavigator()

export default function RootStack() {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name='HomeRoot'
        component={TabNavigator}
      />
      <Stack.Group
        screenOptions={{
          presentation: 'modal',
          headerShown: false,
        }}
      >
        <Stack.Screen
          name='ModalStacks'
          component={ModalStacks}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}