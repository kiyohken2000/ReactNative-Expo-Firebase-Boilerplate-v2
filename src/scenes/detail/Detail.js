import React, { useEffect, useState, useContext } from 'react'
import { Text, View, ScrollView, StyleSheet } from 'react-native'
import ScreenTemplate from '../../components/ScreenTemplate'
import Button from '../../components/Button'
import { useNavigation } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native'
import { colors, fontSize } from 'theme'
import { HomeTitleContext } from '../../context/HomeTitleContext'
import { ColorSchemeContext } from '../../context/ColorSchemeContext'
import { useFocusEffect } from '@react-navigation/native'

export default function Detail() {
  const navigation = useNavigation()
  const route = useRoute()
  const { from, userData, title } = route.params
  const { setTitle } = useContext(HomeTitleContext)
  const { scheme } = useContext(ColorSchemeContext)
  const isDark = scheme === 'dark'
  const colorScheme = {
    content: isDark? styles.darkContent : styles.lightContent,
    text: isDark? colors.white : colors.primaryText
  }

  useFocusEffect(() => {
    setTitle(title)
  });

  useEffect(() => {
    console.log('Detail screen')
  }, [])

  return (
    <ScreenTemplate>
      <ScrollView style={styles.main}>
        <View style={colorScheme.content}>
          <Text style={[styles.field, {color: colorScheme.text}]}>{userData.id}</Text>
          <Text style={[styles.field, {color: colorScheme.text}]}>{userData.fullName}</Text>
          <Text style={[styles.field, {color: colorScheme.text}]}>{userData.email}</Text>
          <Text style={[styles.field, {color: colorScheme.text}]}>{userData.avatar}</Text>
        </View>
        <Button
          label={`Back to ${from}`}
          color={colors.primary}
          onPress={() => navigation.goBack()}
        />
      </ScrollView>
    </ScreenTemplate>
  )
}

const styles = StyleSheet.create({
  lightContent: {
    backgroundColor: colors.lightyellow,
    padding: 20,
    borderRadius: 5,
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
  },
  darkContent: {
    backgroundColor: colors.gray,
    padding: 20,
    borderRadius: 5,
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    flex: 1,
    width: '100%',
  },
  title: {
    fontSize: fontSize.xxxLarge,
    marginBottom: 20,
    textAlign: 'center'
  },
  field: {
    fontSize: fontSize.middle,
    textAlign: 'center',
  },
})