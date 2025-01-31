import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { supabase } from '../../utils/supabase/client';
import EventCard from '../../components/EventCard';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Fetch all events from 'eventManagement' table
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

  return (
    <ScrollView className="p-4 bg-gray-100">
      {events.length === 0 ? (
        <Text className="text-center text-gray-500 text-lg">No Events Available</Text>
      ) : (
        events.map((event, index) => <EventCard key={index} event={event} />)
      )}
    </ScrollView>
  );
};

export default Events;
