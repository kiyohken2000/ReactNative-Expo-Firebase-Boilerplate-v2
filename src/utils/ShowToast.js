import Toast from 'react-native-toast-message';

const showToast = ({title, body}) => {
  Toast.show({
    type: 'success',
    text1: title,
    text2: body
  });
}

export { showToast }