import * as Updates from 'expo-updates'

const Restart = async() => {
  await Updates.reloadAsync()
}

export { Restart }