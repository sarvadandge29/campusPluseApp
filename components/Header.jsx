import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const router = useRouter();
    const [initial, setInitial] = useState("");
    const {user} = useAuth();

    const getInitial = () => {
        if (user?.name) {
            setInitial(user.name.charAt(0).toUpperCase());
        } else if (user?.email) {
            setInitial(user.email.charAt(0).toUpperCase());
        } else {
            setInitial("U");
        }
    };

    useEffect(() => {
        getInitial();
    }, [user]);

    return (
        <SafeAreaView className="flex-row h-12 px-4 justify-between items-center bg-blue-400">
            <TouchableOpacity
                className="flex-row items-center"
                onPress={() => router.replace('/profile')}>
                <TouchableOpacity
                    className="w-10 h-10 bg-black rounded-full justify-center items-center"
                    onPress={() => router.replace('/profile')}>
                    <Text className="text-white text-lg font-IBMPlexSansBold">{initial}</Text>
                </TouchableOpacity>
                <Text className="px-2 text-lg font-IBMPlexSansBold">{user?.name}</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default Header;
