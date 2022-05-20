import React, { useEffect, useContext, useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from "react-native";
import styles from '../../globalStyles'
import ScreenTemplate from '../../components/ScreenTemplate'
import Loading from '../../components/Loading';
import axios from 'axios'
import { colors } from 'theme'
import { ColorSchemeContext } from '../../context/ColorSchemeContext'
import RenderItem from './RenderItem';

export default function Print() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { scheme } = useContext(ColorSchemeContext)
  const isDark = scheme === 'dark'
  const colorScheme = {
    text: isDark? colors.white : colors.primaryText
  }

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async() => {
    try {
      setIsLoading(true)
      const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts')
      setData(data)
    } catch(e) {
      console.log('error', e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ScreenTemplate>
      {!isLoading?
        <ScrollView style={styles.main}>
          {data.map((item, i) => {
            return (
              <View key={i}>
                <RenderItem item={item} />
              </View>
            )
          })}
        </ScrollView>
        :
        <View style={styles.container}>
          <Loading />
        </View>
      }
    </ScreenTemplate>
  )
}