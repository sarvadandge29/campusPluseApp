import { View, Text, ActivityIndicator, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router'; // Use useLocalSearchParams
import { supabase } from '../../utils/supabase/client';

const EventDetails = () => {
  const { eventId } = useLocalSearchParams(); // Get eventId from query parameters
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const { data, error } = await supabase
          .from('eventManagement')
          .select('*')
          .eq('id', eventId)
          .single();

        if (error) throw error;

        setEvent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500 text-center mt-5">Error: {error}</Text>
      </View>
    );
  }

  return (
    <View className="p-4 bg-white">
      {/* Event Name */}
      <Text className="text-2xl font-bold">{event.name}</Text>

      {/* Event Description */}
      <Text className="text-lg mt-2">{event.description}</Text>

      {/* Event Date */}
      <Text className="text-sm text-gray-500 mt-4">Date: {event.date}</Text>

      {/* Club Name */}
      <Text className="text-sm text-gray-500 mt-2">Club: {event.clubName}</Text>

      {/* Event Image */}
      {event.imageLink && (
        <Image
          source={{ uri: event.imageLink }}
          className="w-full h-40 rounded-lg mt-4"
          resizeMode="cover"
        />
      )}
    </View>
  );
};

export default EventDetails;