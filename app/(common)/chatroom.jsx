import { View, Text, StatusBar, TouchableOpacity, SafeAreaView, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { router, useLocalSearchParams } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../utils/supabase/client';
import { Ionicons } from '@expo/vector-icons';
import { Bubble, GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat';
import images from '../../constants/images';
import wallpaper from '../../assets/images/backgroundImage.png';

const Chat = () => {
  const { user } = useAuth();
  const { name, userId } = useLocalSearchParams();
  const [messages, setMessages] = useState([]);

  const getRoomId = (firstUserId, secondUserId) => {
    const sortedIds = [firstUserId, secondUserId].sort();
    return sortedIds.join('-');
  };

  const roomId = getRoomId(userId, user?.userid);

  useEffect(() => {
    const fetchMessages = async () => {
      await getMessagesByRoomId(roomId);
    };
    fetchMessages();
  }, [roomId]);

  const getMessagesByRoomId = async (roomId) => {
    const { data, error } = await supabase
      .from('chatroom')
      .select('*')
      .eq('roomId', roomId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching messages:', error);
      return;
    }

    const formattedMessages = data.map((doc) => ({
      _id: doc.id,
      text: doc.body,
      createdAt: new Date(doc.created_at),
      user: {
        _id: doc.senderName === user.name ? user.id : userId,
        name: doc.senderName,
      },
    }));

    setMessages(formattedMessages);
  };

  // Enable real-time subscription for new messages
  useEffect(() => {
    const channel = supabase.channel(roomId) // Create a channel for this room
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chatroom' }, (payload) => {
        const newMessage = payload.new;
        const formattedMessage = {
          _id: newMessage.id,
          text: newMessage.body,
          createdAt: new Date(newMessage.created_at),
          user: {
            _id: newMessage.senderName === user.name ? user.id : userId,
            name: newMessage.senderName,
          },
        };
        setMessages((prevMessages) => [formattedMessage, ...prevMessages]);
      })
      .subscribe();

    // Cleanup subscription on component unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId, user?.id, user?.name]);

  const onSend = async (newMessages = []) => {
    const newMessage = newMessages[0];
    try {
      // Immediately update the UI with the new message
      setMessages((prevMessages) => [newMessage, ...prevMessages]);

      const { error } = await supabase
        .from('chatroom')
        .insert([
          {
            body: newMessage.text,
            roomId: roomId,
            senderName: user.name,
            created_at: new Date().toISOString(),
          },
        ]);

      if (error) {
        console.error('Error sending message:', error);
        return;
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const renderInputToolbar = (props) => (
    <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor: '#3B82F6',
        padding: 5,
      }}
      textInputStyle={{
        color: '#FFFFFF',
      }}
    />
  );

  const renderSend = (props) => (
    <Send {...props}>
      <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
        <Ionicons name="arrow-forward" size={30} color="white" />
      </View>
    </Send>
  );

  const renderBubble = (props) => (
    <Bubble
      {...props}
      textStyle={{
        left: {
          color: '#000',
        },
        right: {
          color: '#000',
        },
      }}
      wrapperStyle={{
        left: {
          backgroundColor: '#fff',
        },
        right: {
          backgroundColor: '#8DE0E0',
        },
      }}
    />
  );

  const renderTime = (props) => {
    const { currentMessage } = props;
    const formattedTime = currentMessage.createdAt instanceof Date
      ? currentMessage.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : ''; 

    return (
      <View style={{ marginLeft: 5, marginRight: 5, marginBottom: 3 }}>
        <Text style={{ fontSize: 10, color: '#000', opacity: 0.8 }}>
          {formattedTime}
        </Text>
      </View>
    );
  };

  const handlePress = () => {
    router.push({ pathname: '/chat' });
  };

  return (
    <GestureHandlerRootView className="flex-1">
      <ImageBackground className="flex-1" source={images.wallpaper}>
        <SafeAreaView className="flex-1">
          <View className="flex-row px-2 pt-1 bg-blue-400">
            <TouchableOpacity onPress={handlePress}>
              <Ionicons name="arrow-back" size={30} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-2xl pt-1">{name}</Text>
          </View>
          <GiftedChat
            messages={messages}
            onSend={onSend}
            user={{
              _id: user?.id,
              name: user?.name,
            }}
            placeholder="Message"
            alwaysShowSend
            renderInputToolbar={renderInputToolbar}
            inverted={true}
            renderBubble={renderBubble}
            renderTime={renderTime}
            renderSend={renderSend}
          />
        </SafeAreaView>
      </ImageBackground>
    </GestureHandlerRootView>
  );
};

export default Chat;
