import React, { useRef } from 'react'
import { StyleSheet, Dimensions } from "react-native"
import LottieView from "lottie-react-native"

export default function Loading() {
  const animation = useRef(null);
  
  return (
    <LottieView
      ref={animation}
      source={require("../../assets/lottie/98288-loading.json")}
      style={styles.animation}
      autoPlay
    />
  )
}

const { height, width } = Dimensions.get('window')
const styles = StyleSheet.create({
  animation: {
    width: width * 0.25,
    height: height * 0.25,
  },
  container: {
    flex: 1
  }
});