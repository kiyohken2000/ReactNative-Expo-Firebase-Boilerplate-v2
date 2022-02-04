import React, { useEffect, useContext } from 'react'
import { View, Text, StyleSheet } from "react-native";
import styles from '../../globalStyles'
import SafareaBar from '../../components/SafareaBar'
import { colors } from 'theme'
import { ColorSchemeContext } from '../../context/ColorSchemeContext'

export default function Print() {
  const { scheme } = useContext(ColorSchemeContext)

  return (
    <View style={styles.container}>
    <SafareaBar />
      <Text style={[styles.field, {color: scheme === 'dark'? colors.white: colors.primaryText}]}>Print screen</Text>
    </View>
  )
}