import React, { useState, useContext, useEffect } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ScreenTemplate from '../../components/ScreenTemplate';
import Button from '../../components/Button'
import TextInputBox from '../../components/TextInputBox';
import Logo from '../../components/Logo';
import { firestore } from '../../firebase/config'
import { doc, getDoc } from 'firebase/firestore';
import Spinner from 'react-native-loading-spinner-overlay'
import { useNavigation } from '@react-navigation/native'
import { colors, fontSize } from '../../theme';
import { ColorSchemeContext } from '../../context/ColorSchemeContext'
import { LogBox } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/config'

// To ignore a useless warning in terminal.
// https://stackoverflow.com/questions/44603362/setting-a-timer-for-a-long-period-of-time-i-e-multiple-minutes
LogBox.ignoreLogs(['Setting a timer']);

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [spinner, setSpinner] = useState(false)
  const navigation = useNavigation()
  const { scheme } = useContext(ColorSchemeContext)
  const isDark = scheme === 'dark'
  const colorScheme = {
    text: isDark? colors.white : colors.primaryText
  }

  const onFooterLinkPress = () => {
    navigation.navigate('Registration')
  }

  useEffect(() => {
    console.log('Login screen, ログイン画面')
  }, [])

  const onLoginPress = async() => {
    try {
      setSpinner(true)
      const response = await signInWithEmailAndPassword(auth, email, password)
      const uid = response.user.uid
      const usersRef = doc(firestore, 'users', uid)
      const firestoreDocument = await getDoc(usersRef)
      if (!firestoreDocument.exists) {
        setSpinner(false)
        alert("User does not exist anymore.")
        return;
      }
    } catch(error) {
      setSpinner(false)
      alert(error)
    }
  }

  return (
    <ScreenTemplate>
      <KeyboardAwareScrollView
        style={styles.main}
        keyboardShouldPersistTaps="always"
      >
        <Logo />
        <TextInputBox
          placeholder='E-mail'
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
          value={email}
          keyboardType={'email-address'}
        />
        <TextInputBox
          secureTextEntry={true}
          placeholder='Password'
          onChangeText={(text) => setPassword(text)}
          value={password}
          autoCapitalize="none"
        />
        <Button
          label='Log in'
          color={colors.primary}
          onPress={() => onLoginPress()}
        />
        <View style={styles.footerView}>
          <Text style={[styles.footerText, { color: colorScheme.text }]}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
        </View>
      </KeyboardAwareScrollView>
      <Spinner
        visible={spinner}
        textStyle={{ color: colors.white }}
        overlayColor="rgba(0,0,0,0.5)"
      />
    </ScreenTemplate>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: '100%',
  },
  footerView: {
    flex: 1,
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20
  },
  footerText: {
    fontSize: fontSize.large,
  },
  footerLink: {
    color: colors.blueLight,
    fontWeight: "bold",
    fontSize: fontSize.large
  },
})