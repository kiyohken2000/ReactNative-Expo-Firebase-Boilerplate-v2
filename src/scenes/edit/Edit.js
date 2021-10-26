import React, { useState, useEffect, useContext } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import styles from '../../globalStyles'
import SafareaBar from '../../components/SafareaBar'
import { firebase } from '../../firebase/config'
import { Avatar } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator'
import Constants from 'expo-constants'
import { useNavigation } from '@react-navigation/native'
import { colors } from 'theme'
import { UserDataContext } from '../../context/UserDataContext'
import { ColorSchemeContext } from '../../context/ColorSchemeContext'

export default function Edit() {
  const { userData } = useContext(UserDataContext)
  const { scheme } = useContext(ColorSchemeContext)
  const navigation = useNavigation()
  const [fullName, setFullName] = useState('')
  const [progress, setProgress] = useState('')
  const [avatar, setAvatar] = useState(userData.avatar)

  useEffect(() => {
    console.log('Edit screen')
    setAvatar(userData.avatar)
    setFullName(userData.fullName)
  },[])

  const ImageChoiceAndUpload = async () => {
    try {
      if (Constants.platform.ios) {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
          alert("Permission is required for use.");
          return;
        }
      }
      const result = await ImagePicker.launchImageLibraryAsync();
        if (!result.cancelled) {
          const actions = [];
          actions.push({ resize: { width: 300 } });
          const manipulatorResult = await ImageManipulator.manipulateAsync(
            result.uri,
            actions,
            {
              compress: 0.4,
            },
          );
          const localUri = await fetch(manipulatorResult.uri);
          const localBlob = await localUri.blob();
          const filename = userData.id + new Date().getTime()
          const storageRef = firebase.storage().ref().child(`avatar/${userData.id}/` + filename);
          const putTask = storageRef.put(localBlob);
          putTask.on('state_changed', (snapshot) => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(parseInt(progress) + '%')
          }, (error) => {
            console.log(error);
            alert("Upload failed.");
          }, () => {
            putTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              setProgress('')
              setAvatar(downloadURL)
            })
          })
        }
    } catch (e) {
        console.log('error',e.message);
        alert("The size may be too much.");
    }
  }

  const profileUpdate = () => {
    const data = {
      id: userData.id,
      email: userData.email,
      fullName: fullName,
      avatar: avatar,
    }
    const userRef = firebase.firestore().collection('users').doc(userData.id)
    userRef.update(data)
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={styles.main}
        keyboardShouldPersistTaps="always"
      >
        <SafareaBar />
          <View style={styles.avatar}>
            <Avatar
              size="xlarge"
              rounded
              title="NI"
              onPress={ImageChoiceAndUpload}
              source={{ uri: avatar }}
            />
          </View>
          <Text style={scheme === 'dark' ? style.darkprogress : style.progress}>{progress}</Text>
          <Text style={scheme === 'dark' ? styles.darkfield : styles.field}>Name:</Text>
          <TextInput
            style={[styles.input, {backgroundColor: scheme === 'dark'? colors.darkInput: colors.white, color: scheme === 'dark'? colors.white: colors.primaryText }]}
            placeholder={fullName}
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setFullName(text)}
            value={fullName}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <Text style={[styles.field, {color: scheme === 'dark'? colors.white: colors.primaryText}]}>Mail:</Text>
          <Text style={[styles.title, {color: scheme === 'dark'? colors.white: colors.primaryText}]}>{userData.email}</Text>
          <TouchableOpacity
            style={[styles.button, {backgroundColor:colors.primary}]}
            onPress={profileUpdate}
          >
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  )
}

const style = StyleSheet.create({
  progress: {
    alignSelf: 'center',
  },
  darkprogress: {
    alignSelf: 'center',
    color: 'white',
  },
})