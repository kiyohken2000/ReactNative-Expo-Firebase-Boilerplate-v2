import 'react-native-gesture-handler'
import React, { useEffect, useState, createContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { firebase } from '../../firebase/config'
import { colors } from 'theme'
import * as Notifications from 'expo-notifications'
import { useColorScheme } from 'react-native'
import { DefaultTheme, DarkTheme } from '@react-navigation/native'
import {decode, encode} from 'base-64'
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

import { LoginNavigator } from './stacks'
import TabNavigator from './tabs'
// import DrawerNavigator from './drawer'

export const User = createContext();
export const ColorScheme = createContext();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [loading, setLoading] = useState(true)
  const [userData, setUser] = useState(null)
  const scheme = useColorScheme()

  const user = {
    userData, setUser,
  }

  const navigationProps = {
    headerTintColor: 'white',
    headerStyle: { 
      backgroundColor: scheme === 'dark' ? colors.dark : colors.darkPurple
    },
    headerTitleStyle: { fontSize: 18 },
  }
  const colorScheme = {
    scheme, navigationProps
  }

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .onSnapshot(function(document) {
            const userData = document.data()
            setLoading(false)
            setUser(userData)
          })
      } else {
        setLoading(false)
      }
    });
  }, []);

   (async () => {
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

  if (loading) {
    return (
      <></>
    )
  }

  return (
    <ColorScheme.Provider value={colorScheme}>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        { userData ? (
          <User.Provider value={user}>
            <TabNavigator/>
          </User.Provider>
          ) : (
          <LoginNavigator/>
        )}
      </NavigationContainer>
    </ColorScheme.Provider>
  )
}
