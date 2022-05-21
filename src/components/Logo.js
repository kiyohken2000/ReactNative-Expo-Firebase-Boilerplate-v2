import React from "react";
import { Image, StyleSheet } from "react-native";

export default function Logo() {
  return (
    <Image
      style={styles.logo}
      source={require('../../assets/icon.png')}
    />
  )
}

const styles = StyleSheet.create({
  logo: {
    flex: 1,
    height: 180,
    width: 180,
    alignSelf: "center",
    margin: 30,
    borderRadius: 20
  },
})