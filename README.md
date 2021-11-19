# React Native Expo with Firebase V2

- [Expo link](https://expo.io/@votepurchase/reactnative-expo-firebase-boilerplate-v2)

## Screens

<img src='https://github.com/kiyohken2000/ReactNative-Expo-Firebase-Boilerplate-v2/blob/master/__DELELE_ME__/img1.jpg' width='80%'>

<img src='https://github.com/kiyohken2000/ReactNative-Expo-Firebase-Boilerplate-v2/blob/master/__DELELE_ME__/img6.jpg' width='80%'>

## Infrastructure

- React Native 
- Expo
- Firebase(Authentication, Firestore, Cloud Storage)

## Libraries

- Expo
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

## Features

- BottomTab, TopTab, Modal and Stack navigation
- Registration with E-mail & Password
- Login with E-mail and Password
- Deleting an account
- Handling persisted login credentials
- Writing to Firestore Database
- Reading from Firestore Database
- Uploading images to Cloud Storage
- Update user profile
- Dynamic switching of dark themes by device appearance
- Dynamic header title
- Retrieving Expo push tokens and saving them to Firestore

## Difference from v1

[reactnative-expo-firebase-boilerplate v1](https://github.com/kiyohken2000/reactnative-expo-firebase-boilerplate)

- use Context API
- Adjustment style file

## How to use

### 1. Install

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
expo start
```

## Licence

This project is available under the MIT license. See the [LICENSE](https://github.com/kiyohken2000/ReactNative-Expo-Firebase-Boilerplate-v2/blob/master/LICENSE) file for more info.
