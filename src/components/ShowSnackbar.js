import React from "react";
import { Snackbar } from "react-native-paper";

export default function ShowSnackbar(props) {
  const { visible, onDismissSnackBar, title, duration } = props

  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismissSnackBar}
      duration={duration}
    >
      {title}
    </Snackbar>
  )
}