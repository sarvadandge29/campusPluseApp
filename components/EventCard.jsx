import React from 'react';
import { View, Text, Image } from 'react-native';

const EventCard = ({ event }) => {
  return (
    <View className="bg-white p-4 rounded-lg shadow-md mb-3">
      {/* Event Image */}
      {event.imageLink && (
        <Image source={{ uri: event.imageLink }} className="w-full h-40 rounded-lg mb-3" resizeMode="cover" />
      )}

      {/* Event Name */}
      <Text className="text-xl font-semibold text-blue-600">{event.name}</Text>

      {/* Club Name */}
      <Text className="text-gray-700 text-sm">🏛️ {event.clubName}</Text>

      {/* Event Date */}
      <Text className="text-gray-700 text-sm">📅 {event.date}</Text>

      {/* Event Description */}
      <Text className="text-gray-500 mt-2">{event.description}</Text>
    </View>
  );
};

export default EventCard;
