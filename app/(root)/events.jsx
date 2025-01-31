import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { supabase } from '../../utils/supabase/client';
import EventCard from '../../components/EventCard';
import { useRouter } from 'expo-router';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase.from('eventManagement').select('*');

        if (error) throw error;

        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" className="flex-1 justify-center mt-10" />;
  }

  if (error) {
    return <Text className="text-red-500 text-center mt-5">Error: {error}</Text>;
  }

  const handleEventPress = (event) => {
    // Redirect to EventDetails page with event ID as a parameter
    router.push(`/eventdetails?eventId=${event.id}`); // Ensure event.id is valid
  };

  return (
    <ScrollView className="p-4 bg-gray-100">
      {events.length === 0 ? (
        <Text className="text-center text-gray-500 text-lg">No Events Available</Text>
      ) : (
        events.map((event, index) => (
          <TouchableOpacity key={index} onPress={() => handleEventPress(event)}>
            <EventCard event={event} />
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
};

export default Events;