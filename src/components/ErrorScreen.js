import React, { useRef, useContext } from 'react'
import { StyleSheet, Dimensions, View, Text } from "react-native"
import LottieView from "lottie-react-native"
import { fontSize, colors } from '../theme';
import { ColorSchemeContext } from '../context/ColorSchemeContext';

export default function ErrorScreen() {
  const animation = useRef(null);
  const { scheme } = useContext(ColorSchemeContext)
  const isDark = scheme === 'dark'
  const colorScheme = {
    text: isDark? colors.white : colors.primaryText
  }
  
  return (
    <View style={styles.container}>
      <LottieView
        ref={animation}
        source={require("../../assets/lottie/113121-error-404.json")}
        style={styles.animation}
        autoPlay
      />
      <Text style={[styles.text, {color: colorScheme.text}]}>Network Error</Text>
    </View>
  )
}

const { height, width } = Dimensions.get('window')
const styles = StyleSheet.create({
  animation: {
    width: width * 0.3,
    height: height * 0.3,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: fontSize.large
  }
});