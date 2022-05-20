import React, { useEffect, useContext } from 'react'
import { View, Text, StyleSheet } from "react-native";
import styles from '../../globalStyles'
import SafareaBar from '../../components/SafareaBar'
import { colors } from 'theme'
import { ColorSchemeContext } from '../../context/ColorSchemeContext'

export default function Print() {
  const { scheme } = useContext(ColorSchemeContext)
  const isDark = scheme === 'dark'
  const colorScheme = {
    text: isDark? colors.white : colors.primaryText
  }

  return (
    <View style={styles.container}>
    <SafareaBar />
      <Text style={[styles.field, {color: colorScheme.text}]}>Print screen</Text>
    </View>
  )
}