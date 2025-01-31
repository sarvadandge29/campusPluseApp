import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import UserCard from '../../components/UserCard';
import { supabase } from '../../utils/supabase/client';

const Chat = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*');

        if (error) {
          throw error;
        }

        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        console.log(users)
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text className="text-red-500 text-center mt-5">Error: {error}</Text>;
  }

  return (
    <View className="flex-1 p-4 bg-gray-50">
      <Text className="text-2xl font-bold text-gray-800 text-center mb-4">Chat With</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <UserCard user={item} />
        )}
      />
    </View>
  );
};

export default Chat;