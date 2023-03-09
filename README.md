# React Native Expo with Firebase V2

- [Expo link](https://expo.io/@votepurchase/reactnative-expo-firebase-boilerplate-v2)

<a href="https://www.buymeacoffee.com/votepurchase" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>

## Screens

<img src='https://github.com/kiyohken2000/ReactNative-Expo-Firebase-Boilerplate-v2/blob/master/__DELELE_ME__/img1.jpg' width='80%'>

<img src='https://github.com/kiyohken2000/ReactNative-Expo-Firebase-Boilerplate-v2/blob/master/__DELELE_ME__/img6.jpg' width='80%'>

## Requirements

- Node 16
- Yarn 1.22.x
- expo-cli
- eas-cli

## Infrastructure

- React Native 
- Expo
- Firebase(Authentication, Firestore, Cloud Storage)

## Libraries

- expo
- firebase
- axios
- react-navigation
- expo-constants
- expo-image-manipulator
- expo-image-picker
- expo-notifications
- react-native-elements
- react-native-paper
- react-native-svg
- react-native-vector-icons
- [jotai](https://jotai.org)
- moment

## Features

- BottomTab, TopTab, Modal and Stack navigation
- Registration with E-mail & Password
- Login with E-mail and Password
- Change password
- Deleting an account
- Handling persisted login credentials
- Writing to Firestore Database
- Reading from Firestore Database
- Uploading images to Cloud Storage
- Update user profile
- Dynamic switching of dark themes by device appearance
- Dynamic header title
- Retrieving Expo push tokens and saving them to Firestore
- State management by Jotai

## Difference from v1

[reactnative-expo-firebase-boilerplate v1](https://github.com/kiyohken2000/reactnative-expo-firebase-boilerplate)

- use Context API
- Adjustment style file

## How to use

### 1. Install

Download zip or click "Use this template"

or

```
git clone https://github.com/kiyohken2000/ReactNative-Expo-Firebase-Boilerplate-v2.git
cd ReactNative-Expo-Firebase-Boilerplate-v2
yarn install
```

### 2. Setting up Firebase

**Step 1: Create a Google Firebase Account**

- Go to [https://console.firebase.google.com/](https://console.firebase.google.com/)
- Sign up an account and create a new project
- Put in your project name, click "Continue".
- Google Analytics can be enabled or disabled.
- Click "Create Project" it is going to take a while before it says "Your new project is ready", click "Continue."

**Step 2: Configure Firebase Console Sign-In Methods**

- On "Project Overview", click the "Authentication" on the left sidebar.
- Click on the second tab where it said "Sign-In method"
- Enable all the Sign-in method you would like to enable. For now, we will enable the "Email/Password" option.

<img src='https://github.com/kiyohken2000/ReactNative-Expo-Firebase-Boilerplate-v2/blob/master/__DELELE_ME__/img3.png' width='80%'>

**Step 3: Configure Firebase Console Firestore**

- We will then click the "Cloud Firestore" on the left to create a database.
- Select the "Start in test mode" option, click "next."
- Select the "Cloud Firestore location", click "Enable"
- Create the "users" and "tokens" collections. An empty document is fine.

<img src='https://github.com/kiyohken2000/ReactNative-Expo-Firebase-Boilerplate-v2/blob/master/__DELELE_ME__/img4.png' width='80%'>

***Security Rules***

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isLogin() {
      return request.auth.uid != null;
    }
    match /{document=**} {
      allow read, write: if isLogin();
    }
  }
}
```

**Step 4: Create a folder in Cloud Storage**

- Next. Click Storage on the left.
- Create an empty "avatar" folder.
- Upload the image file "icon.png" of your choice. This is the default icon for app users.

<img src='https://github.com/kiyohken2000/ReactNative-Expo-Firebase-Boilerplate-v2/blob/master/__DELELE_ME__/img5.png' width='80%'>

***Security Rules***

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

**Step 5: Copy the API Key**

- On the Project Overview, click on the "Web" icon since we are building on Expo.
- Then give it a name, click "Register app".
- It will show you the Firebase configuration, copy the SDK keys, we will use it in the next step.

<img src='https://github.com/kiyohken2000/ReactNative-Expo-Firebase-Boilerplate-v2/blob/master/__DELELE_ME__/img2.png' width='80%'>

**Step 6: Connect Firebase**

- Write the copied API Key in your app.

`src\config.js`

```javascript
const firebaseKey = {
  apiKey: "Your API Key",
  authDomain: "Your API Key",
  projectId: "Your API Key",
  storageBucket: "Your API Key",
  messagingSenderId: "Your API Key",
  appId: "Your API Key",
  measurementId: "Your API Key"
};
```

### 3. Update app.json and default avatar

Replace the name and Slug with yours.

```
"name": "your-app-name",
"slug": "your-app-name",
```

`src\config.js`

```javascript
const defaultAvatar = 'Your default icon URL'
```

### 4. Run Your App

```
yarn start
```

## How to use utils

- ### Reload app

```javascript
import { Restart } from '../../utils/Restart'

const ourFunc = () => {
  Restart()
}
```

- ### Storage

```javascript
import { storage } from '../../utils/Storage'

const saveStorage = async() => {
  const today = moment().toString()
  await storage.save({
    key: 'date',
    data: {
      'date': today
    }
  })
}

const loadStorage = async() => {
  try {
    const result = await storage.load({key: 'date'})
  } catch (e) {
    console.log(e)
  }
}

const removeStorage = async() => {
  await storage.remove({ key: 'date' })
}
```

- ### Toast & Notification

<img src='https://github.com/kiyohken2000/ReactNative-Expo-Firebase-Boilerplate-v2/blob/master/__DELELE_ME__/img7.jpg' width='80%'>

```javascript
// Toast
import { showToast } from '../../utils/ShowToast'

const onShowToastPress = () => {
  showToast({
    title: 'Hello',
    body: 'This is some something 👋',
    isDark // true or false
  })
}

// Send Notification
import { sendNotification } from '../../utils/SendNotification'

const onNotificationPress = async() => {
  const res = await sendNotification({
    title: 'Hello',
    body: 'This is some something 👋',
    data: 'something data',
    token: token.token //e.g. ExponentPushToken[WGSdXiJ5rLHAK53DRPq2x-]
  })
  console.log(res)
}
```

- ### Snackbar

<img src='https://github.com/kiyohken2000/ReactNative-Expo-Firebase-Boilerplate-v2/blob/master/__DELELE_ME__/img9.png' width='80%'>

```javascript
import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import ScreenTemplate from '../../components/ScreenTemplate'
import Button from '../../components/Button'
import ShowSnackbar from '../../components/ShowSnackbar' // import snackbar component

export default function Follower() {
  const [visible, setVisible] = useState(false) // create snackbar state

  const onDismissSnackBar = () => setVisible(false) // create hide snackbar function

  const onShowSnackbarPress = () => { // create show snackbar function
    setVisible(true)
  }

  return (
    <>
    <ScreenTemplate>
      <View style={styles.container}>
        <View style={{width:'100%'}}>
          <Button
            label='Show Snackbar'
            color={colors.purple}
            onPress={onShowSnackbarPress}
          />
        </View>
      </View>
    </ScreenTemplate>
    {/* Pass props to snackbar component */}
    <ShowSnackbar
      visible={visible}
      onDismissSnackBar={onDismissSnackBar}
      title='Hello 👋'
      duration={3000}
    />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
```

- ### Data fetch, Loading, Error

<img src='https://github.com/kiyohken2000/ReactNative-Expo-Firebase-Boilerplate-v2/blob/master/__DELELE_ME__/img8.jpg' width='80%'>

```javascript
export default function Print() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false) // Create loading flag
  const [isError, setIsError] = useState(false) // Create error flag

  const fetchData = async() => {
    try {
      setIsLoading(true) // Set flag
      const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts')
      setData(data)
    } catch(e) {
      console.log('error', e)
      setIsError(true) // Set flag
    } finally {
      setIsLoading(false) // Set flag
    }
  }

  return (
    <ScreenTemplate isLoading={isLoading} isError={isError}> {/* Pass flag to ScreenTemplate component */}
      <ScrollView style={styles.main}>
        {data.map((item, i) => {
          return (
            <RenderItem item={item} key={i} index={i} />
          )
        })}
      </ScrollView>
    </ScreenTemplate>
  )
}
```

## Note

- ### getExpoPushTokenAsync()

The experienceId is required to get the push token using getExpoPushTokenAsync in the EAS build.

```javascript
const token = await Notifications.getExpoPushTokenAsync({
  experienceId: '@username/projectSlug'
});
```

- ### .easignore

If you want to use environment variables in EAS build, create .easignore.

[How projects are uploaded to EAS Build](https://github.com/expo/fyi/blob/main/eas-build-archive.md)

## Migrate to EAS

- [Official Document](https://docs.expo.dev/development/getting-started/)

SDK47 and later do not support classic build. You must use EAS build to build your application.

### Requirements

- expo account
- eas-cli

### 1. Install `expo-dev-client`

```
npx expo install expo-dev-client
```

### 2. Create `eas.json` and update `eas.json`

```
eas build:configure
```

*example*

 `eas.json`

```
{
  "cli": {
    "version": ">= 0.56.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "releaseChannel": "development",
      "ios": {
        "simulator": false
      }
    },
    "preview": {
      "distribution": "internal",
      "releaseChannel": "internal"
    },
    "production": {
      "releaseChannel": "production"
    }
  },
  "submit": {
    "production": {}
  }
}
```

### 3. Update `package.json`

```
"scripts": {
  "start": "npx expo start --dev-client", // <= this
  "android": "npx expo start --android",
  "ios": "npx expo start --ios",
  "eject": "expo eject",
  "postinstall": "patch-package",
  "expopublish": "npx expo publish",
  "lint": "node_modules/.bin/eslint src/ --fix src/ --fix",
  "test": "node_modules/.bin/jest --passWithNoTests"
},
```

### 4. Register iPhone in Ad Hoc and install profile on iPhone

```
eas device:create
```

### 5. Build your App and Install your App on your device

```
eas build --profile development --platform ios
eas build --profile development --platform android
```

### 6. Run

```
yarn start
```

Scan the QR code above with Expo Go (Android) or the Camera app (iOS)

### 7. Commands

```
// build: develop
eas build --profile development --platform ios
eas build --profile development --platform android

// build: internal
eas build --profile preview --platform ios
eas build --profile preview --platform android

// build: production
eas build --profile production --platform ios
eas build --profile production --platform android

// OTA update
expo publish --release-channel internal
expo publish --release-channel production

// iOS: Setting up ad hoc provisioning
eas device:create
// list all registered devices for your account
eas device:list
```

## Licence

This project is available under the MIT license. See the [LICENSE](https://github.com/kiyohken2000/ReactNative-Expo-Firebase-Boilerplate-v2/blob/master/LICENSE) file for more info.
