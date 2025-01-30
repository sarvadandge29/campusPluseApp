import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const CommonLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='profile' options={{ headerShown: false }} />
    </Stack>
  )
}

export default CommonLayout