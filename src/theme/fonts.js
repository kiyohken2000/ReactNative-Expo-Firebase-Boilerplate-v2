import * as Font from 'expo-font'

export const fonts = {
  openSan: {
    regular: 'openSans_regular',
    regularItalic: 'openSans_regular_italic',
    semiBold: 'openSans_semiBold',
    semiBoldItalic: 'openSans_semiBold_italic',
    bold: 'openSans_bold',
    boldItalic: 'openSans_bold_italic',
  },
}

// fonts preloading
export const fontsAll = [
  {
    openSans_regular: require('../../assets/fonts/OpenSans-Regular.ttf'),
  },
  {
    openSans_regular_italic: require('../../assets/fonts/OpenSans-Italic.ttf'),
  },
  {
    openSans_semiBold: require('../../assets/fonts/OpenSans-Semibold.ttf'),
  },
  {
    openSans_semiBold_italic: require('../../assets/fonts/OpenSans-SemiboldItalic.ttf'),
  },
  {
    openSans_bold: require('../../assets/fonts/OpenSans-Bold.ttf'),
  },
  {
    openSans_bold_italic: require('../../assets/fonts/OpenSans-BoldItalic.ttf'),
  },
  {
    FontAwesome: require('../../node_modules/react-native-vector-icons/Fonts/FontAwesome.ttf'),
  },
  {
    'FontAwesome5Free-Regular': require('../../node_modules/react-native-vector-icons/Fonts/FontAwesome5_Regular.ttf'),
  },
  {
    'FontAwesome5Free-Solid': require('../../node_modules/react-native-vector-icons/Fonts/FontAwesome5_Solid.ttf'),
  },
  {
    'FontAwesome5Brands-Regular': require('../../node_modules/react-native-vector-icons/Fonts/FontAwesome5_Brands.ttf'),
  },
  {
    FontAwesome5_Regular: require('../../node_modules/react-native-vector-icons/Fonts/FontAwesome5_Regular.ttf'),
  },
  {
    FontAwesome5_Solid: require('../../node_modules/react-native-vector-icons/Fonts/FontAwesome5_Solid.ttf'),
  },
  {
    FontAwesome5_Brands: require('../../node_modules/react-native-vector-icons/Fonts/FontAwesome5_Brands.ttf'),
  },
]
export const fontAssets = fontsAll.map((x) => Font.loadAsync(x))
