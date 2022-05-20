import * as Updates from 'expo-updates'

const Restart = () => {
  Updates.reloadAsync()
}

export { Restart }