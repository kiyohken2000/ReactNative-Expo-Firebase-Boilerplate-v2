import React, { useEffect, useContext, useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from "react-native";
import ScreenTemplate from '../../components/ScreenTemplate'
import Loading from '../../components/Loading';
import axios from 'axios'
import RenderItem from './RenderItem';

export default function Print() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

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
              <RenderItem item={item} key={i} index={i} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    flex: 1,
    width: '100%',
  },
})