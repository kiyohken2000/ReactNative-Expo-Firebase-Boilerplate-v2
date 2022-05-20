import React, { useEffect, useState, useContext } from 'react'
import { Text, View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import styles from '../../globalStyles'
import ScreenTemplate from '../../components/ScreenTemplate'
import { useNavigation } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native'
import { colors } from 'theme'
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
    content: isDark? style.darkContent : style.lightContent,
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
      <View style={styles.container}>
        <ScrollView style={styles.main}>
          <View style={colorScheme.content}>
            <Text style={[styles.field, {color: colorScheme.text}]}>{userData.id}</Text>
            <Text style={[styles.field, {color: colorScheme.text}]}>{userData.fullName}</Text>
            <Text style={[styles.field, {color: colorScheme.text}]}>{userData.email}</Text>
            <Text style={[styles.field, {color: colorScheme.text}]}>{userData.avatar}</Text>
          </View>
          <TouchableOpacity
            style={[styles.button, {backgroundColor:colors.primary}]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Back to {from}</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ScreenTemplate>
  )
}

const style = StyleSheet.create({
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
})