import React, { useEffect, useContext } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import styles from '../../globalStyles'
import SafareaBar from '../../components/SafareaBar'
import { useRoute } from '@react-navigation/native'
import { colors } from 'theme'
import { ColorSchemeContext } from '../../context/ColorSchemeContext'

export default function Post() {
  const route = useRoute()
  const userData = route.params.data
  const from = route.params.from
  const { scheme } = useContext(ColorSchemeContext)

  useEffect(() => {
    console.log('Post screen')
  }, [])

  return (
    <View style={[styles.container, scheme === 'dark'?style.darkContent:style.lightContent]}>
      <SafareaBar />
      <Text style={[styles.field, {color: scheme === 'dark'? colors.white: colors.primaryText}]}>Post Screen</Text>
      <Text style={[styles.title, {color: scheme === 'dark'? colors.white: colors.primaryText}]}>{userData.email}</Text>
      <Text style={[styles.field, {color: scheme === 'dark'? colors.white: colors.primaryText}]}>from</Text>
      <Text style={[styles.title, {color: scheme === 'dark'? colors.white: colors.primaryText}]}>{from}</Text>
    </View>
  )
}

const style = StyleSheet.create({
  lightContent: {
    backgroundColor: '#e6e6fa'
  },
  darkContent: {
    backgroundColor: '#696969'
  },
})