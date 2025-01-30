import { useFonts } from 'expo-font';
import { Stack } from 'expo-router'
import React from 'react'
import "../global.css";
import { StatusBar } from 'expo-status-bar';

const AppLayout = () => {
    const [fontsLoaded, error] = useFonts({
        'IBMPlexSans-Regular': require('../assets/fonts/IBMPlexSans-Regular.ttf'),
        'IBMPlexSans-Medium': require('../assets/fonts/IBMPlexSans-Medium.ttf'),
        'IBMPlexSans-SemiBold': require('../assets/fonts/IBMPlexSans-SemiBold.ttf'),
        'IBMPlexSans-Bold': require('../assets/fonts/IBMPlexSans-Bold.ttf'),
        'bebasNeueRegular': require('../assets/fonts/BebasNeue-Regular.ttf'),
    });

    return (
        <>
            <StatusBar style="light" backgroundColor="#3B82F6" />
            <Stack>
                <Stack.Screen name='index' options={{ headerShown: false }} />
            </Stack>
        </>
    )
}

export default AppLayout