import React, { useEffect, useContext } from 'react'
import { useDispatch } from 'react-redux'
import { authenticate } from 'slices/app.slice'
import { Text, View } from "react-native";
import { UserDataContext } from '../../context/UserDataContext';
import { ColorSchemeContext } from '../../context/ColorSchemeContext'
import { firestore } from '../../firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';
import styles from '../../globalStyles'
import { decode, encode } from 'base-64'
import { colors } from 'theme'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/config';
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

export default function Initial() {
  const dispatch = useDispatch()
  const { setUserData } = useContext(UserDataContext)
  const { scheme } = useContext(ColorSchemeContext)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const usersRef = doc(firestore, 'users', user.uid)
        onSnapshot(usersRef, (querySnapshot) => {
          const userData = querySnapshot.data()
          setUserData(userData)
          dispatch(authenticate({ loggedIn: true, checked: true }))
        })
      } else {
        dispatch(authenticate({ loggedIn: false, checked: true }))
      }
    });
  }, []);

  return (
    <View style={[styles.container, {backgroundColor: scheme === 'dark'? colors.dark: colors.white}]}>
      <Text style={[styles.title, {color: scheme === 'dark'? colors.white: colors.primaryText}]}>loading</Text>
    </View>
  )
}