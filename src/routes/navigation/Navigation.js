import 'react-native-gesture-handler'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { firebase } from '../../firebase/config'
import { colors } from 'theme'
import * as Notifications from 'expo-notifications'
import { useColorScheme } from 'react-native'
import { DefaultTheme, DarkTheme } from '@react-navigation/native'
import { UserDataContext } from '../../context/UserDataContext'
import { ColorSchemeContext } from '../../context/ColorSchemeContext'
import { decode, encode } from 'base-64'
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

import { LoginNavigator } from './stacks'
import TabNavigator from './tabs'
// import DrawerNavigator from './drawer'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const colorScheme = useColorScheme()
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState(null)
  const [scheme, setScheme] = useState(colorScheme)
  const [navigationProps, setNavigationProps] = useState(null)

  const navigationCurrentProps = {
    headerTintColor: 'white',
    headerStyle: { 
      backgroundColor: colorScheme === 'dark' ? colors.dark : colors.darkPurple
    },
    headerTitleStyle: { fontSize: 18 },
    headerMode: 'float'
  }

  useEffect(() => {
    setScheme(colorScheme)
    setNavigationProps(navigationCurrentProps)
  }, [colorScheme]);

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
    <ColorSchemeContext.Provider value={{scheme, navigationProps}}>
      <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        { userData ? (
          <UserDataContext.Provider value={{userData, setUserData}}>
            <TabNavigator/>
          </UserDataContext.Provider>
          ) : (
          <LoginNavigator/>
        )}
      </NavigationContainer>
    </ColorSchemeContext.Provider>
  )
}
