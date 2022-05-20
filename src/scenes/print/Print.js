import React, { useEffect, useContext } from 'react'
import { View, Text, StyleSheet } from "react-native";
import styles from '../../globalStyles'
import ScreenTemplate from '../../components/ScreenTemplate'
import { colors } from 'theme'
import { ColorSchemeContext } from '../../context/ColorSchemeContext'

export default function Print() {
  const { scheme } = useContext(ColorSchemeContext)
  const isDark = scheme === 'dark'
  const colorScheme = {
    text: isDark? colors.white : colors.primaryText
  }

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <Text style={[styles.field, {color: colorScheme.text}]}>Print screen</Text>
      </View>
    </ScreenTemplate>
  )
}