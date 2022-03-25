import React, { useEffect, useContext } from 'react'
import { useDispatch } from 'react-redux'
import { authenticate } from 'slices/app.slice'
import { Text, View } from "react-native";
import { UserDataContext } from '../../context/UserDataContext';
import { ColorSchemeContext } from '../../context/ColorSchemeContext'
import { firebase } from '../../firebase/config';
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
      const usersRef = firebase.firestore().collection('users');
      if (user) {
        usersRef
          .doc(user.uid)
          .onSnapshot(function(document) {
            const userData = document.data()
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