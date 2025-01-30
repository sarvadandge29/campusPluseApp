import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'react-native'

const AuthLayout = () => {
  return (
    <>
      <StatusBar style="light" backgroundColor="#3B82F6" />

      <Stack>
        <Stack.Screen name="signIn" options={{ headerShown: false }} />
        <Stack.Screen name="signUp" options={{ headerShown: false }} />
      </Stack>
    </>
  )
}

export default AuthLayout