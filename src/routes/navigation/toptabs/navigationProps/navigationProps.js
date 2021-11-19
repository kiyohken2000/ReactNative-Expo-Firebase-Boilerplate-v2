import { colors } from 'theme'
import { Platform } from 'react-native'

const labelSize = Platform.select({
  ios: 14,
  android: 12
})

const screenOptions= {
  tabBarLabelStyle: {
    fontSize: labelSize
  },
  tabBarActiveTintColor: colors.purple,
  tabBarInactiveTintColor: colors.lightPurple,
  tabBarShowLabel: true
}

export { screenOptions }