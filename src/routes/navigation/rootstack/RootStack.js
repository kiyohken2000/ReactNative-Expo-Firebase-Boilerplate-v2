import React, { useState, useContext, useEffect } from "react";
import { createStackNavigator } from '@react-navigation/stack'
import TabNavigator from "../tabs/Tabs";
import { ModalStacks } from "../stacks/ModalStacks/ModalStacks";
import * as Notifications from 'expo-notifications'
import { firebase } from "../../../firebase/config";
import { UserDataContext } from "../../../context/UserDataContext";

const Stack = createStackNavigator()

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function RootStack() {
  const { userData, setUserData } = useContext(UserDataContext)

  useEffect(() => {
    (async () => {
      console.log('get push token')
      const { status: existingStatus } = await Notifications.getPermissionsAsync()
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        return;
      }
      const token = await Notifications.getExpoPushTokenAsync();
      await firebase.firestore().collection("tokens").doc(userData.id).set({ token: token.data, id: userData.id })
    })();
  }, [userData])

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