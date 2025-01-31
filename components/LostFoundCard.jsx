import { View, Text, Image } from 'react-native';
import React from 'react';

const LostFoundCard = ({ title, description, foundAt, imageUrl }) => {
  return (
    <View className="bg-white p-4 rounded-lg shadow-md mb-3">
      {/* Item Image */}
      {imageUrl && (
        <Image
          source={{ uri: imageUrl }}
          className="w-full h-40 rounded-lg mb-3"
          resizeMode="contain"
        />
      )}

      {/* Item Title */}
      <Text className="text-xl font-semibold text-blue-600">{title}</Text>

      {/* Found At Location */}
      <Text className="text-gray-700 text-sm">📍 {foundAt}</Text>

      {/* Item Description */}
      <Text className="text-gray-500 mt-2">{description}</Text>
    </View>
  );
};

export default LostFoundCard;