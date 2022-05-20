import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { fontSize, colors } from "../theme";

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

const styles = StyleSheet.create({
  button: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: 'center'
  },
  buttonText: {
    color: colors.white,
    fontSize: fontSize.large
  },
})