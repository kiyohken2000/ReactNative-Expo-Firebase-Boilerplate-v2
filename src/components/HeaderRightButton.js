import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import { colors } from "../theme";
import { useNavigation } from "@react-navigation/native";

export default function HeaderRightButton(props) {
  const { from, userData } = props
  const navigation = useNavigation()

  const onButtonPress = () => {
    navigation.navigate('ModalStacks', {
      screen: 'Post',
      params: {
        data: userData,
        from: from
      }
    })
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onButtonPress()}
    >
      <FontIcon
        name="bars"
        color={colors.lightPurple}
        size={24}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  }
})