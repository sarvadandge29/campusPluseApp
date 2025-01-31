import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { supabase } from '../../../utils/supabase/client';
import LostFoundCard from '../../../components/LostFoundCard';
import { useRouter } from 'expo-router'; // Import useRouter

const AllRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const { data, error } = await supabase.from('lostFound').select('*');
        if (error) throw error;
        setRequests(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" className="flex-1 justify-center mt-10" />;
  }

  if (error) {
    return <Text className="text-red-500 text-center mt-5">Error: {error}</Text>;
  }

  return (
    <ScrollView className="p-4 bg-gray-100">
      {requests.length === 0 ? (
        <Text className="text-center text-gray-500 text-lg">No Requests Found</Text>
      ) : (
        requests.map((request) => (
          <TouchableOpacity
            key={request.id}
            onPress={() => router.push(`/lostfounddetail?requestId=${request.id}`)} // Navigate to details page
          >
            <LostFoundCard
              title={request.title}
              description={request.description}
              foundAt={request.foundAt}
              imageUrl={request.imageUrl}
            />
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
};

export default AllRequests;