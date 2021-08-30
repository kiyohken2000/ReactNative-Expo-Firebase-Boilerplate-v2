import React, { useEffect, useState, useContext, useLayoutEffect } from 'react'
import { Text, View, ScrollView, StatusBar, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { IconButton, Colors } from 'react-native-paper'
import styles from '../../globalStyles'
import { firebase } from '../../firebase/config'
import { ColorScheme } from '../../routes/navigation/Navigation'
import { colors } from 'theme'
import { UserDataContext } from '../../context/UserDataContext'

export default function Home() {
  const navigation = useNavigation()
  const [token, setToken] = useState('')
  const { userData } = useContext(UserDataContext)
  const { scheme } = useContext(ColorScheme)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="cast"
          color={Colors.blue500}
          size={24}
          onPress={() => alert('Tapped header button')}
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    firebase.firestore()
      .collection('tokens')
      .doc(userData.id)
      .get().then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          const data = doc.data()
          setToken(data)
        } else {
          console.log("No such document!");
        }
      }).catch((error) => {
        console.log("Error getting document:", error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
        <ScrollView style={styles.main}>
          <View style={scheme === 'dark'?style.darkContent: style.lightContent}>
            <Text style={[styles.field, {color: scheme === 'dark'? colors.white: colors.primaryText}]}>Mail:</Text>
            <Text style={[styles.title, {color: scheme === 'dark'? colors.white: colors.primaryText}]}>{userData.email}</Text>
            <Text style={[styles.field, {color: scheme === 'dark'? colors.white: colors.primaryText}]}>Expo push token:</Text>
            <Text style={[styles.title, {color: scheme === 'dark'? colors.white: colors.primaryText}]}>{token.token}</Text>
          </View>
          <TouchableOpacity
            style={[styles.button, {backgroundColor:colors.primary}]}
            onPress={() => navigation.navigate('Detail', { data: userData, from: 'Home', title: userData.email})}
          >
            <Text style={styles.buttonText}>Go to Detail</Text>
          </TouchableOpacity>
        </ScrollView>
    </View>
  )
}

const style = StyleSheet.create({
  lightContent: {
    backgroundColor: colors.lightyellow,
    padding: 20,
    borderRadius: 20,
    marginLeft: 30,
    marginRight: 30,
  },
  darkContent: {
    backgroundColor: colors.gray,
    padding: 20,
    borderRadius: 20,
    marginLeft: 30,
    marginRight: 30,
  },
})