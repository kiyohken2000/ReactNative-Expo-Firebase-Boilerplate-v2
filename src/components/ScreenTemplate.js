import React, { useContext } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { colors } from "../theme";
import { StatusBar } from 'expo-status-bar';
import { ColorSchemeContext } from "../context/ColorSchemeContext";

export default function ScreenTemplate(props) {
  const { scheme } = useContext(ColorSchemeContext)
  const isDark = scheme === 'dark'
  const container = isDark?styles.darkContainer: styles.container

  return (
    <SafeAreaView style={container}>
      <StatusBar style='light' />
        {props.children}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  darkContainer: {
    flex: 1,
    backgroundColor: colors.black
  }
})