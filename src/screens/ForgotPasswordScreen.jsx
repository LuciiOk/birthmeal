import React from 'react'
import { StyleSheet, Text as T, View } from 'react-native'

const ForgotPasswordScreen = () => {
  return (
    <View style={styles.container}>
      <T style={styles.text}>ForgotPasswordScreen</T>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default ForgotPasswordScreen