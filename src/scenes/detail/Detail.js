import React, { useEffect, useState, useContext } from 'react'
import { Text, View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import styles from '../../globalStyles'
import SafareaBar from '../../components/SafareaBar'
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

  useFocusEffect(() => {
    setTitle(title)
  });

  useEffect(() => {
    console.log('Detail screen')
  }, [])

  return (
    <View style={styles.container}>
      <SafareaBar />
        <ScrollView style={styles.main}>
          <View style={scheme === 'dark'?style.darkContent: style.lightContent}>
            <Text style={[styles.field, {color: scheme === 'dark'? colors.white: colors.primaryText}]}>{userData.id}</Text>
            <Text style={[styles.field, {color: scheme === 'dark'? colors.white: colors.primaryText}]}>{userData.fullName}</Text>
            <Text style={[styles.field, {color: scheme === 'dark'? colors.white: colors.primaryText}]}>{userData.email}</Text>
            <Text style={[styles.field, {color: scheme === 'dark'? colors.white: colors.primaryText}]}>{userData.avatar}</Text>
          </View>
          <TouchableOpacity
            style={[styles.button, {backgroundColor:colors.primary}]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Back to {from}</Text>
          </TouchableOpacity>
        </ScrollView>
    </View>
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