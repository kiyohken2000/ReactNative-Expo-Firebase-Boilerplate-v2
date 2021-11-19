import React, { useEffect, useContext } from 'react'
import { Text, View } from 'react-native'
import styles from '../../globalStyles'
import SafareaBar from '../../components/SafareaBar'
import { colors } from 'theme'
import { ColorSchemeContext } from '../../context/ColorSchemeContext'

export default function Follower() {
  const { scheme } = useContext(ColorSchemeContext)

  useEffect(() => {
    console.log('Follower screen')
  }, [])

  return (
    <View style={styles.container}>
      <SafareaBar />
      <Text style={[styles.field, {color: scheme === 'dark'? colors.white: colors.primaryText}]}>Follower Screen</Text>
    </View>
  )
}