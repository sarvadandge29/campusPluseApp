import React, { useState, useCallback } from 'react';
import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { GiftedChat } from 'react-native-gifted-chat';

const Chatroom = () => {
  // Receive parameters from the previous screen
  const { name, department, skills, user } = useLocalSearchParams();

  // Chat state
  const [messages, setMessages] = useState([]);

  // Function to handle sending messages
  const onSend = useCallback((newMessages = []) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
  }, []);

  return (
    <View className="flex-1 bg-gray-100">
      {/* Chat Header */}
      <View className="p-4 bg-blue-600 rounded-md">
        <Text className="text-white text-lg font-bold">{name}</Text>
        <Text className="text-gray-300 text-sm">{department} | {skills}</Text>
      </View>

      {/* Chat UI */}
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => onSend(newMessages)}
        user={{
        //   _id: userId, // Unique user ID
          name: name,
        }}
      />
    </View>
  );
};

export default Chatroom;