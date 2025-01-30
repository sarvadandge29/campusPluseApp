import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import React, { useEffect } from "react";
import "../global.css";
import AuthProvider from "../context/AuthContext";

const AppLayout = () => {
    const [fontsLoaded, error] = useFonts({
        "IBMPlexSans-Regular": require("../assets/fonts/IBMPlexSans-Regular.ttf"),
        "IBMPlexSans-Medium": require("../assets/fonts/IBMPlexSans-Medium.ttf"),
        "IBMPlexSans-SemiBold": require("../assets/fonts/IBMPlexSans-SemiBold.ttf"),
        "IBMPlexSans-Bold": require("../assets/fonts/IBMPlexSans-Bold.ttf"),
        "bebasNeueRegular": require("../assets/fonts/BebasNeue-Regular.ttf"),
    });

    useEffect(() => {
        if (error) throw error;
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, error]);

    if (!fontsLoaded) {
        return null;
    }

    return (

        <AuthProvider>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(root)" options={{ headerShown: false }} />
                <Stack.Screen name="(common)" options={{ headerShown: false }} />
            </Stack>
        </AuthProvider>

    );
};

export default AppLayout;
