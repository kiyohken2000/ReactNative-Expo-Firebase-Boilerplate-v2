import React, { useContext } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { colors } from "../theme";
import { StatusBar } from 'expo-status-bar';
import { ColorSchemeContext } from "../context/ColorSchemeContext";
import LoadingScreen from "./LoadingScreen";
import ErrorScreen from "./ErrorScreen";

export default function ScreenTemplate(props) {
  const { isLoading, isError } = props
  const { scheme } = useContext(ColorSchemeContext)
  const isDark = scheme === 'dark'
  const container = isDark?styles.darkContainer: styles.container

  if(isLoading) {
    return <LoadingScreen />
  }

  if(isError) {
    return <ErrorScreen />
  }

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