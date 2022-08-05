import React, { useEffect, useState, useContext, useLayoutEffect } from 'react'
import { Text, View, ScrollView, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { IconButton, Colors } from 'react-native-paper'
import ScreenTemplate from '../../components/ScreenTemplate'
import Button from '../../components/Button'
import { firestore } from '../../firebase/config'
import { doc, onSnapshot } from 'firebase/firestore';
import { colors, fontSize } from 'theme'
import { UserDataContext } from '../../context/UserDataContext'
import { ColorSchemeContext } from '../../context/ColorSchemeContext'
import { sendNotification } from '../../utils/SendNotification'

export default function Home() {
  const navigation = useNavigation()
  const [token, setToken] = useState('')
  const { userData } = useContext(UserDataContext)
  const { scheme } = useContext(ColorSchemeContext)
  const isDark = scheme === 'dark'
  const colorScheme = {
    content: isDark? styles.darkContent : styles.lightContent,
    text: isDark? colors.white : colors.primaryText
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="cast"
          color={Colors.blue500}
          size={24}
          onPress={() => headerButtonPress()}
        />
      ),
    });
  }, [navigation]);

  const headerButtonPress = () => {
    alert('Tapped header button')
  }

  useEffect(() => {
    const tokensRef = doc(firestore, 'tokens', userData.id);
    const tokenListner = onSnapshot(tokensRef, (querySnapshot) => {
      if (querySnapshot.exists) {
        const data = querySnapshot.data()
        setToken(data)
      } else {
        console.log("No such document!");
      }
    })
    return () => tokenListner()
  }, [])

  const onNotificationPress = async() => {
    const res = await sendNotification({
      title: 'Hello',
      body: 'This is some something 👋',
      data: 'something data',
      token: token.token
    })
    console.log(res)
  }

  return (
    <ScreenTemplate>
      <ScrollView style={styles.main}>
        <View style={colorScheme.content}>
          <Text style={[styles.field, { color: colorScheme.text }]}>Mail:</Text>
          <Text style={[styles.title, { color: colorScheme.text }]}>{userData.email}</Text>
          {token ?
            <>
              <Text style={[styles.field, { color: colorScheme.text }]}>Expo push token:</Text>
              <Text style={[styles.title, { color: colorScheme.text }]}>{token.token}</Text>
            </> : null
          }
        </View>
        <Button
          label='Go to Detail'
          color={colors.primary}
          onPress={() => navigation.navigate('Detail', { userData: userData, from: 'Home', title: userData.email })}
        />
        <Button
          label='Open Modal'
          color={colors.tertiary}
          onPress={() => {
            navigation.navigate('ModalStacks', {
              screen: 'Post',
              params: {
                data: userData,
                from: 'Home screen'
              }
            })
          }}
        />
        <Button
          label='Send Notification'
          color={colors.pink}
          onPress={() => onNotificationPress()}
          disable={!token}
        />
      </ScrollView>
    </ScreenTemplate>
  )
}

const styles = StyleSheet.create({
  lightContent: {
    backgroundColor: colors.lightyellow,
    padding: 20,
    borderRadius: 5,
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
  },
  darkContent: {
    backgroundColor: colors.gray,
    padding: 20,
    borderRadius: 5,
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
  },
  main: {
    flex: 1,
    width: '100%',
  },
  title: {
    fontSize: fontSize.xxxLarge,
    marginBottom: 20,
    textAlign: 'center'
  },
  field: {
    fontSize: fontSize.middle,
    textAlign: 'center',
  },
})