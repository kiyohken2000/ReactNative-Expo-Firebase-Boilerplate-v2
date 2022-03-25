import React, { useState, useEffect, useContext } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import styles from '../../globalStyles'
import SafareaBar from '../../components/SafareaBar'
import { useRoute, useFocusEffect, useNavigation } from '@react-navigation/native'
import { colors } from 'theme'
import { ColorSchemeContext } from '../../context/ColorSchemeContext'
import { HomeTitleContext } from '../../context/HomeTitleContext'
import { storage } from '../../components/Storage'
import moment from 'moment'

export default function Post() {
  const route = useRoute()
  const { data, from } = route.params
  const { scheme } = useContext(ColorSchemeContext)
  const [date, setDate] = useState('')
  const { setTitle } = useContext(HomeTitleContext)
  const navigation = useNavigation()

  useEffect(() => {
    console.log('Post screen')
    loadStorage()
  }, [])

  useFocusEffect(() => {
    setTitle(data.fullName)
  });

  const loadStorage = async() => {
    try {
      const result = await storage.load({key: 'date'})
      setDate(result)
    } catch (e) {
      const result = {date: 'no data'}
      setDate(result)
    }
  }

  const saveStorage = () => {
    const today = moment().toString()
    storage.save({
      key: 'date',
      data: {
        'date': today
      }
    })
  }

  const removeStorage = () => {
    storage.remove({ key: 'date' })
  }

  const onSavePress = () => {
    saveStorage()
    loadStorage()
  }

  const onRemovePress = () => {
    removeStorage()
    loadStorage()
  }

  return (
    <View style={[styles.container, scheme === 'dark'?style.darkContent:style.lightContent, ]}>
      <SafareaBar />
      <Text style={[styles.field, {color: scheme === 'dark'? colors.white: colors.primaryText}]}>Post Screen</Text>
      <Text style={[styles.title, {color: scheme === 'dark'? colors.white: colors.primaryText}]}>{data.email}</Text>
      <Text style={[styles.field, {color: scheme === 'dark'? colors.white: colors.primaryText}]}>from</Text>
      <Text style={[styles.title, {color: scheme === 'dark'? colors.white: colors.primaryText}]}>{from}</Text>
      <Text style={[styles.field, {color: scheme === 'dark'? colors.white: colors.primaryText}]}>Latest save date</Text>
      <Text style={[styles.title, {color: scheme === 'dark'? colors.white: colors.primaryText}]}>{date.date}</Text>
      <View style={{width:'100%'}}>
        <TouchableOpacity
          style={[styles.button, {backgroundColor:colors.primary}]}
          onPress={() => onSavePress()}
        >
          <Text style={styles.buttonText}>Save Date</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {backgroundColor:colors.secondary}]}
          onPress={() => onRemovePress()}
        >
          <Text style={styles.buttonText}>Remove Date</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {backgroundColor:colors.tertiary}]}
          onPress={() => navigation.navigate('Print')}
        >
          <Text style={styles.buttonText}>Go to Print</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  lightContent: {
    backgroundColor: '#e6e6fa'
  },
  darkContent: {
    backgroundColor: '#696969'
  },
})