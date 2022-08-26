import React, { useState, useContext, useEffect } from "react";
import { Platform } from "react-native";
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import TabNavigator from "../tabs/Tabs";
import { ModalStacks } from "../stacks/ModalStacks/ModalStacks";
import * as Notifications from 'expo-notifications'
import { firestore } from "../../../firebase/config";
import { setDoc, doc } from 'firebase/firestore';
import { UserDataContext } from "../../../context/UserDataContext";
import * as Device from 'expo-device';

const Stack = createStackNavigator()

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function RootStack() {
  const { userData } = useContext(UserDataContext)
  const isIos = Platform.OS === 'ios'

  useEffect(() => {
    (async () => {
      const isDevice = Device.isDevice
      if(!isDevice) return
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
      const tokensRef = doc(firestore, 'tokens', userData.id);
      await setDoc(tokensRef, {
        token: token.data,
        id: userData.id
      })
    })();
  }, [userData])

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification.request.content)
    });
    return () => subscription.remove();
  }, []);

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
          gestureEnabled: true,
          cardOverlayEnabled: true,
          ...TransitionPresets.ModalPresentationIOS,
          gestureEnabled: isIos
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