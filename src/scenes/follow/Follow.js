import React, { useEffect, useContext } from 'react'
import { Text, View, TouchableOpacity, ScrollView } from 'react-native'
import styles from '../../globalStyles'
import SafareaBar from '../../components/SafareaBar'
import { colors } from 'theme'
import { ColorSchemeContext } from '../../context/ColorSchemeContext'
import { UserDataContext } from '../../context/UserDataContext'
import { useNavigation } from '@react-navigation/native'

export default function Follow() {
  const navigation = useNavigation()
  const { scheme } = useContext(ColorSchemeContext)
  const { userData } = useContext(UserDataContext)

  useEffect(() => {
    console.log('Follow screen')
  }, [])

  return (
    <View style={styles.container}>
      <SafareaBar />
      <View style={{width:'100%'}}>
        <Text style={[styles.field, {color: scheme === 'dark'? colors.white: colors.primaryText}]}>Follow Screen</Text>
        <TouchableOpacity
          style={[styles.button, {backgroundColor:colors.tertiary}]}
          onPress={() => {
            navigation.navigate('ModalStacks', {
              screen: 'Post',
              params: {
                data: userData,
                from: 'Follow screen'
              }
            })
          }}
        >
          <Text style={styles.buttonText}>Opne Modal</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}