import React, { useState, useContext, useEffect } from 'react'
import { Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from '../../globalStyles'
import SafareaBar from '../../components/SafareaBar'
import { firebase } from '../../firebase/config'
import Spinner from 'react-native-loading-spinner-overlay'
import { useNavigation } from '@react-navigation/native'
import { colors } from 'theme'
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
      const usersRef = firebase.firestore().collection('users')
      const firestoreDocument = await usersRef.doc(uid).get()
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
    <View style={styles.container}>
      <SafareaBar />
      <KeyboardAwareScrollView
        style={styles.main}
        keyboardShouldPersistTaps="always"
      >
        <Image
          style={styles.logo}
          source={require('../../../assets/icon.png')}
        />
        <TextInput
          style={[styles.input, { backgroundColor: scheme === 'dark' ? colors.darkInput : colors.white, color: scheme === 'dark' ? colors.white : colors.primaryText }]}
          placeholder='E-mail'
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          keyboardType={'email-address'}
        />
        <TextInput
          style={[styles.input, { backgroundColor: scheme === 'dark' ? colors.darkInput : colors.white, color: scheme === 'dark' ? colors.white : colors.primaryText }]}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder='Password'
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={() => onLoginPress()}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={[styles.footerText, { color: scheme === 'dark' ? colors.white : colors.primaryText }]}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
        </View>
      </KeyboardAwareScrollView>
      <Spinner
        visible={spinner}
        textStyle={{ color: "#fff" }}
        overlayColor="rgba(0,0,0,0.5)"
      />
    </View>
  )
}