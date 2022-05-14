import { LogBox } from 'react-native'
import ignoreWarnings from 'ignore-warnings';

ignoreWarnings('warn',['ViewPropTypes','[react-native-gesture-handler]'])

// eslint-disable-next-line no-unused-expressions
LogBox?.ignoreLogs([
  'ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from \'deprecated-react-native-prop-types\'.',
  'Remote debugger'
])
