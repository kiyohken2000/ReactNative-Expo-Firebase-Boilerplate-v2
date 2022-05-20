import React, { useEffect, useContext } from 'react'
import { Text, View } from 'react-native'
import styles from '../../globalStyles'
import SafareaBar from '../../components/SafareaBar'
import { colors } from 'theme'
import { ColorSchemeContext } from '../../context/ColorSchemeContext'

export default function Follower() {
  const { scheme } = useContext(ColorSchemeContext)
  const isDark = scheme === 'dark'
  const colorScheme = {
    text: isDark? colors.white : colors.primaryText
  }

  useEffect(() => {
    console.log('Follower screen')
  }, [])

  return (
    <View style={styles.container}>
      <SafareaBar />
      <Text style={[styles.field, {color: colorScheme.text}]}>Follower Screen</Text>
    </View>
  )
}