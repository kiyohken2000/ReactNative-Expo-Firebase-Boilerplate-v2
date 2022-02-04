import 'react-native-gesture-handler'
import React, { useEffect, useState, useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { firebase } from '../../firebase/config'
import * as Notifications from 'expo-notifications'
import { DefaultTheme, DarkTheme } from '@react-navigation/native'
import { decode, encode } from 'base-64'
import { ColorSchemeContext } from '../../context/ColorSchemeContext'
import { UserDataContext } from '../../context/UserDataContext'
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

import { LoginNavigator } from './stacks'
import TabNavigator from './tabs'
// import DrawerNavigator from './drawer'
import RootStack from './rootstack/RootStack'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [loading, setLoading] = useState(true)
  const { scheme } = useContext(ColorSchemeContext)
  const { userData, setUserData } = useContext(UserDataContext)

  useEffect(() => {
    console.log('fetch user data')
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .onSnapshot(function(document) {
            const userData = document.data()
            setLoading(false)
            setUserData(userData)
          })
      } else {
        setLoading(false)
      }
    });
  }, []);

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

  if (loading) {
    return (
      <></>
    )
  }

  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      { userData ? (
        <RootStack/>
        ) : (
        <LoginNavigator/>
      )}
    </NavigationContainer>
  )
}
