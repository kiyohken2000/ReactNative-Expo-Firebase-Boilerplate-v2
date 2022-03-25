import React, { useState, useContext, useEffect } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, Linking } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from '../../globalStyles'
import SafareaBar from '../../components/SafareaBar'
import { firebase } from '../../firebase/config'
import Spinner from 'react-native-loading-spinner-overlay'
import { useNavigation } from '@react-navigation/native'
import { colors } from 'theme'
import { ColorSchemeContext } from '../../context/ColorSchemeContext'
import { defaultAvatar, eulaLink } from '../../config'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config'

export default function Registration() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [spinner, setSpinner] = useState(false)
  const navigation = useNavigation()
  const { scheme } = useContext(ColorSchemeContext)

  useEffect(() => {
    console.log('Registration screen')
  }, [])

  const onFooterLinkPress = () => {
    navigation.navigate('Login')
  }

  const onRegisterPress = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.")
      return
    }
    setSpinner(true)
      createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        const uid = response.user.uid
        const data = {
          id: uid,
          email,
          fullName,
          avatar: defaultAvatar,
        };
        const usersRef = firebase.firestore().collection('users')
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
          })
          .catch((error) => {
            setSpinner(false)
            alert(error)
          });
      })
      .catch((error) => {
        setSpinner(false)
        alert(error)
    });
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
          style={[styles.input, {backgroundColor: scheme === 'dark'? colors.darkInput: colors.white, color: scheme === 'dark'? colors.white: colors.primaryText }]}
          placeholder='Your Name'
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setFullName(text)}
          value={fullName}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={[styles.input, {backgroundColor: scheme === 'dark'? colors.darkInput: colors.white, color: scheme === 'dark'? colors.white: colors.primaryText }]}
          placeholder='E-mail'
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          keyboardType={'email-address'}
        />
        <TextInput
          style={[styles.input, {backgroundColor: scheme === 'dark'? colors.darkInput: colors.white, color: scheme === 'dark'? colors.white: colors.primaryText }]}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder='Password'
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={[styles.input, {backgroundColor: scheme === 'dark'? colors.darkInput: colors.white, color: scheme === 'dark'? colors.white: colors.primaryText }]}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder='Confirm Password'
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={[styles.button, {backgroundColor:colors.primary}]}
          onPress={() => onRegisterPress()}>
          <Text style={styles.buttonText}>Agree and Create account</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={[styles.footerText, {color: scheme === 'dark'? colors.white: colors.primaryText}]}>Already got an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
        </View>
        <Text style={styles.link} onPress={ ()=>{ Linking.openURL(eulaLink)}}>Require agree EULA</Text>
      </KeyboardAwareScrollView>
      <Spinner
        visible={spinner}
        textStyle={{ color: "#fff" }}
        overlayColor="rgba(0,0,0,0.5)"
      />
    </View>
  )
}
