import React, { useContext } from "react";
import { Text, StyleSheet, View } from "react-native";
import { colors, fontSize } from "../../theme";
import { ColorSchemeContext } from "../../context/ColorSchemeContext";

export default function RenderItem(props) {
  const { userId, id, title, body } = props.item
  const { scheme } = useContext(ColorSchemeContext)
  const isDark = scheme === 'dark'
  const colorScheme = {
    text: isDark? colors.white : colors.primaryText
  }

  return (
    <View
      style={styles.container}
    >
      <Text style={[styles.title, {color: colorScheme.text}]}>{title}</Text>
      <Text style={[styles.body, {color: colorScheme.text}]}>{body}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  title: {
    fontSize: fontSize.large
  },
  body: {
    fontSize: fontSize.small
  }
})