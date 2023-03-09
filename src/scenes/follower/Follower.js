import React, { useEffect, useContext, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import ScreenTemplate from '../../components/ScreenTemplate'
import { colors, fontSize } from '../../theme'
import { ColorSchemeContext } from '../../context/ColorSchemeContext'
import Button from '../../components/Button'
import { showToast } from '../../utils/ShowToast'
import ShowSnackbar from '../../components/ShowSnackbar'

export default function Follower() {
  const { scheme } = useContext(ColorSchemeContext)
  const [visible, setVisible] = useState(false)
  const isDark = scheme === 'dark'
  const colorScheme = {
    text: isDark? colors.white : colors.primaryText
  }

  useEffect(() => {
    console.log('Follower screen')
  }, [])

  const onDismissSnackBar = () => setVisible(false)

  const onShowToastPress = () => {
    showToast({
      title: 'Hello',
      body: 'This is some something 👋',
      isDark
    })
  }

  const onShowSnackbarPress = () => {
    setVisible(true)
  }

  return (
    <>
    <ScreenTemplate>
      <View style={styles.container}>
        <View style={{width:'100%'}}>
          <Text style={[styles.field, {color: colorScheme.text}]}>Follower Screen</Text>
          <Button
            label='Show Toast'
            color={colors.lightPurple}
            onPress={onShowToastPress}
          />
          <Button
            label='Show Snackbar'
            color={colors.purple}
            onPress={onShowSnackbarPress}
          />
        </View>
      </View>
    </ScreenTemplate>
    <ShowSnackbar
      visible={visible}
      onDismissSnackBar={onDismissSnackBar}
      title='Hello 👋'
      duration={3000}
    />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  field: {
    fontSize: fontSize.middle,
    textAlign: 'center',
  },
})