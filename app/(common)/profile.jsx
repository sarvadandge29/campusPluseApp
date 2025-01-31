import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../utils/supabase/client';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.replace('/signIn');
    }
  }, [user]);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout', onPress: async () => {
            try {
              await supabase.auth.signOut();
              await AsyncStorage.clear();
              router.replace('/signIn');
            } catch (error) {
              console.error('Error logging out:', error);
            }
          }
        },
      ]
    );
  };

  if (!user) return null;

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-xl font-bold mb-4">Profile</Text>

      <View className="bg-gray-200 p-4 rounded-lg">
        <Text className="text-lg font-semibold">Name: <Text className="font-normal">{user?.name || "N/A"}</Text></Text>
        <Text className="text-lg font-semibold">Email: <Text className="font-normal">{user?.email || "N/A"}</Text></Text>
        <Text className="text-lg font-semibold">Phone: <Text className="font-normal">{user?.phonenumber || "N/A"}</Text></Text>
        <Text className="text-lg font-semibold">Department: <Text className="font-normal">{user?.department || "N/A"}</Text></Text>
        <Text className="text-lg font-semibold">Gender: <Text className="font-normal">{user?.gender || "N/A"}</Text></Text>
        <Text className="text-lg font-semibold">Hobbies: <Text className="font-normal">{user?.hobbies || "None"}</Text></Text>
        <Text className="text-lg font-semibold">Skills: <Text className="font-normal">{user?.skills || "N/A"}</Text></Text>
      </View>

      <TouchableOpacity
        className="mt-6 bg-red-500 p-3 rounded-lg"
        onPress={handleLogout}
      >
        <Text className="text-white text-center font-bold">Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
