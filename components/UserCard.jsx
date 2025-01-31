import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

const UserCard = ({ user }) => {
  if (!user || typeof user !== 'object') {
    return null;
  }

  const handleCardPress = () => {
    if (user?.userid) {
      router.push({
        pathname: '/chatroom',
        params: {
          name: user?.name || 'Unknown',
          userId: user?.userid,
        },
      });
    }
  };

  return (
    <TouchableOpacity onPress={handleCardPress} activeOpacity={0.7}>
      <View className="bg-white p-4 rounded-lg shadow-md mb-4">
        <Text className="text-lg font-semibold text-gray-900">{user?.name || 'No Name'}</Text>
        <Text className="text-sm text-gray-600 mt-2">Department: {user?.department || 'No Department'}</Text>
        <Text className="text-sm text-gray-500 mt-1">Skills: {user?.skills || 'No Skills'}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default UserCard;
