import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import styles from '../globalStyles'

export default function Button(props) {
  const { label, onPress, color } = props
  
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  )
}