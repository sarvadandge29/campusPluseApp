import { StatusBar } from 'react-native'
import React from 'react'
import { Redirect, Stack } from 'expo-router'
import { useAuth } from '../../context/AuthContext';

const CommonLayout = () => {
  const {user} = useAuth();
  if (!user) {
    return <Redirect href='/signIn'/>
  }
  return (
    <>
      <StatusBar style="light" backgroundColor="#3B82F6" />  
      <Stack>
        <Stack.Screen name='profile' options={{ headerShown: false }} />
        <Stack.Screen name='chatroom' options={{ headerShown: false }} />
      </Stack>
    </>
  )
}

export default CommonLayout