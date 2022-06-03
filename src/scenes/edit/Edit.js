import React, { useState, useEffect, useContext } from 'react'
import { Text, View, StyleSheet, Platform } from 'react-native'
import ScreenTemplate from '../../components/ScreenTemplate'
import Button from '../../components/Button'
import TextInputBox from '../../components/TextInputBox'
import { firestore, storage } from '../../firebase/config'
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Avatar } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator'
import { useNavigation } from '@react-navigation/native'
import { colors, fontSize } from '../../theme'
import { UserDataContext } from '../../context/UserDataContext'
import { ColorSchemeContext } from '../../context/ColorSchemeContext'

export default function Edit() {
  const { userData } = useContext(UserDataContext)
  const { scheme } = useContext(ColorSchemeContext)
  const navigation = useNavigation()
  const [fullName, setFullName] = useState(userData.fullName)
  const [progress, setProgress] = useState('')
  const [avatar, setAvatar] = useState(userData.avatar)
  const isDark = scheme === 'dark'
  const colorScheme = {
    text: isDark? colors.white : colors.primaryText,
    progress: isDark? styles.darkprogress : styles.progress,
  }

  useEffect(() => {
    console.log('Edit screen')
  }, [])

  const ImageChoiceAndUpload = async () => {
    try {
      if (Platform.OS === 'ios') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
          alert("Permission is required for use.");
          return;
        }
      }
      const result = await ImagePicker.launchImageLibraryAsync();
        if (!result.cancelled) {
          let actions = [];
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
          const storageRef = ref(storage, `avatar/${userData.id}/` + filename)
          const uploadTask = uploadBytesResumable(storageRef, localBlob)
          uploadTask.on('state_changed',
            (snapshot) => {
              let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setProgress(parseInt(progress) + '%')
            },
            (error) => {
              console.log(error);
              alert("Upload failed.");
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setProgress('')
                setAvatar(downloadURL)
              });
            }
          );
        }
    } catch (e) {
      console.log('error',e.message);
      alert("The size may be too much.");
    }
  }

  const profileUpdate = async() => {
    try {
      const data = {
        id: userData.id,
        email: userData.email,
        fullName: fullName,
        avatar: avatar,
      }
      const usersRef = doc(firestore, 'users', userData.id);
      await updateDoc(usersRef, data)
      navigation.goBack()
    } catch(e) {
      alert(e)
    }
  }

  return (
    <ScreenTemplate>
      <KeyboardAwareScrollView
        style={styles.main}
        keyboardShouldPersistTaps="always"
      >
        <View style={styles.avatar}>
          <Avatar
            size="xlarge"
            rounded
            title="NI"
            onPress={ImageChoiceAndUpload}
            source={{ uri: avatar }}
          />
        </View>
        <Text style={colorScheme.progress}>{progress}</Text>
        <Text style={[styles.field, {color: colorScheme.text}]}>Name:</Text>
        <TextInputBox
          placeholder={fullName}
          onChangeText={(text) => setFullName(text)}
          value={fullName}
          autoCapitalize="none"
        />
        <Text style={[styles.field, {color: colorScheme.text}]}>Mail:</Text>
        <Text style={[styles.title, {color: colorScheme.text}]}>{userData.email}</Text>
        <Button
          label='Update'
          color={colors.primary}
          onPress={profileUpdate}
          disable={!fullName}
        />
      </KeyboardAwareScrollView>
    </ScreenTemplate>
  )
}

const styles = StyleSheet.create({
  progress: {
    alignSelf: 'center',
  },
  darkprogress: {
    alignSelf: 'center',
    color: colors.white,
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
  avatar: {
    margin: 30,
    alignSelf: "center",
  },
})