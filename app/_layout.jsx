import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router'
import React, { useEffect } from 'react'
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

    useEffect(() => {
        if (error) throw error;

        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }

    }, []);


    if (!fontsLoaded) {
        return null;
    }

    if (!fontsLoaded && !error) {
        return null;
    }

    return (
        <>
            <StatusBar style="light" backgroundColor="#3B82F6" />
            <Stack>
                <Stack.Screen name='index' options={{ headerShown: false }} />
                <Stack.Screen name='(auth)' options={{ headerShown: false }} />
                <Stack.Screen name='(root)' options={{ headerShown: false }} />
                <Stack.Screen name='(common)' options={{ headerShown: false }} />
            </Stack>
        </>
    )
}

export default AppLayout