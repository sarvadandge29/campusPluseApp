import { View, Text, ActivityIndicator, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router'; // Use useLocalSearchParams
import { supabase } from '../../utils/supabase/client';

const LostFoundDetail = () => {
  const { requestId } = useLocalSearchParams(); // Get requestId from query parameters
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        const { data, error } = await supabase
          .from('lostFound')
          .select('*')
          .eq('id', requestId)
          .single();

        if (error) throw error;

        setRequest(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequestDetails();
  }, [requestId]);

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
      {/* Item Image */}
      {request.imageUrl && (
        <Image
          source={{ uri: request.imageUrl }}
          className="w-full h-40 rounded-lg mb-3"
          resizeMode="contain"
        />
      )}

      {/* Item Title */}
      <Text className="text-2xl font-bold">{request.title}</Text>

      {/* Found At Location */}
      <Text className="text-gray-700 text-sm mt-2">📍 {request.foundAt}</Text>

      {/* Item Description */}
      <Text className="text-lg mt-2">{request.description}</Text>
    </View>
  );
};

export default LostFoundDetail;