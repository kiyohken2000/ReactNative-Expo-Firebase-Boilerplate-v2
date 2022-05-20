import React, { useEffect, useContext } from 'react'
import { Text, View, TouchableOpacity, ScrollView } from 'react-native'
import styles from '../../globalStyles'
import ScreenTemplate from '../../components/ScreenTemplate'
import Button from '../../components/Button'
import { colors } from 'theme'
import { ColorSchemeContext } from '../../context/ColorSchemeContext'
import { UserDataContext } from '../../context/UserDataContext'
import { useNavigation } from '@react-navigation/native'

export default function Follow() {
  const navigation = useNavigation()
  const { userData } = useContext(UserDataContext)
  const { scheme } = useContext(ColorSchemeContext)
  const isDark = scheme === 'dark'
  const colorScheme = {
    text: isDark? colors.white : colors.primaryText
  }

  useEffect(() => {
    console.log('Follow screen')
  }, [])

  return (
    <ScreenTemplate>
      <View style={[styles.container]}>
        <View style={{width:'100%'}}>
          <Text style={[styles.field, {color: colorScheme.text}]}>Follow Screen</Text>
          <Button
            label='Opne Modal'
            color={colors.tertiary}
            onPress={() => {
              navigation.navigate('ModalStacks', {
                screen: 'Post',
                params: {
                  data: userData,
                  from: 'Follow screen'
                }
              })
            }}
          />
        </View>
      </View>
    </ScreenTemplate>
  )
}