import React, { useState, useContext, useEffect } from 'react'
import { Text, View, TouchableOpacity, ScrollView } from 'react-native'
import { Avatar } from 'react-native-elements'
import Dialog from "react-native-dialog"
import Spinner from 'react-native-loading-spinner-overlay'
import styles from '../../globalStyles'
import SafareaBar from '../../components/SafareaBar'
import { Restart } from '../../components/Restart'
import { firebase } from '../../firebase/config'
import { ColorSchemeContext } from '../../context/ColorSchemeContext'
import { UserDataContext } from '../../context/UserDataContext'
import { useNavigation } from '@react-navigation/native'
import { colors } from 'theme'
import { signOut, deleteUser } from 'firebase/auth'
import { auth } from '../../firebase/config'

export default function Profile() {
  const { userData } = useContext(UserDataContext)
  const { scheme } = useContext(ColorSchemeContext)
  const navigation = useNavigation()
  const [visible, setVisible] = useState(false)
  const [spinner, setSpinner] = useState(false)

  useEffect(() => {
    console.log('Profile screen')
  }, [])

  const goDetail = () => {
    navigation.navigate('Edit', { userData: userData })
  }

  const onSignOutPress = () => {
    signOut(auth)
    .then(() => {
      Restart()
    })
    .catch((error) => {
      console.log(error.message);
    });
  }

  const showDialog = () => {
    setVisible(true)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const accountDelete = async () => {
    setSpinner(true)
    const collectionRef = firebase.firestore()
    await collectionRef.collection('tokens').doc(userData.id).delete()
    await collectionRef.collection('users').doc(userData.id).delete()
    const user = auth.currentUser
    deleteUser(user).then(() => {
      setSpinner(false)
      signOut(auth)
      .then(() => {
        console.log('user deleted')
      })
      .catch((error) => {
        console.log(error.message);
      });
    }).catch((error) => {
      setSpinner(false)
      console.log(error)
    });
  }

  return (
    <View style={styles.container}>
      <SafareaBar />
      <ScrollView style={styles.main}>
        <View style={styles.avatar}>
          <Avatar
            size="xlarge"
            rounded
            title="NI"
            source={{ uri: userData.avatar }}
          />
        </View>
        <Text style={[styles.field, { color: scheme === 'dark' ? colors.white : colors.primaryText }]}>Name:</Text>
        <Text style={[styles.title, { color: scheme === 'dark' ? colors.white : colors.primaryText }]}>{userData.fullName}</Text>
        <Text style={[styles.field, { color: scheme === 'dark' ? colors.white : colors.primaryText }]}>Mail:</Text>
        <Text style={[styles.title, { color: scheme === 'dark' ? colors.white : colors.primaryText }]}>{userData.email}</Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={goDetail}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.tertiary }]}
          onPress={() => {
            navigation.navigate('ModalStacks', {
              screen: 'Post',
              params: {
                data: userData,
                from: 'Profile screen'
              }
            })
          }}
        >
          <Text style={styles.buttonText}>Open Modal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.secondary }]}
          onPress={showDialog}
        >
          <Text style={styles.buttonText}>Account delete</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text onPress={onSignOutPress} style={styles.footerLink}>Sign out</Text>
        </View>
      </ScrollView>
      <Dialog.Container visible={visible}>
        <Dialog.Title>Account delete</Dialog.Title>
        <Dialog.Description>
          Do you want to delete this account? You cannot undo this action.
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="Delete" onPress={accountDelete} />
      </Dialog.Container>
      <Spinner
        visible={spinner}
        textStyle={{ color: "#fff" }}
        overlayColor="rgba(0,0,0,0.5)"
      />
    </View>
  )
}