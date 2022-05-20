import React, { useEffect, useContext } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import ScreenTemplate from '../../components/ScreenTemplate'
import { colors, fontSize } from 'theme'
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
    <ScreenTemplate>
      <View style={styles.container}>
        <Text style={[styles.field, {color: colorScheme.text}]}>Follower Screen</Text>
      </View>
    </ScreenTemplate>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  field: {
    fontSize: fontSize.middle,
    textAlign: 'center',
  },
})