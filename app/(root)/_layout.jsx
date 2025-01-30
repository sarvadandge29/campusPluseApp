import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { StatusBar } from 'react-native';

const RootLayout = () => {
  return (
    <>
      <StatusBar style="light" backgroundColor="#3B82F6" />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: 'blue', // Customize the active tab color
          tabBarInactiveTintColor: 'gray', // Customize the inactive tab color
        }}
      >
        <Tabs.Screen
          name="chat"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="chatbubbles" size={size} color={color} />
            ),
            tabBarLabel: 'Chat', // Optional: Customize the label
          }}
        />
        <Tabs.Screen
          name="events"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="event" size={size} color={color} />
            ),
            tabBarLabel: 'Events',
          }}
        />
        <Tabs.Screen
          name="(lostFound)"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="search" size={size} color={color} />
            ),
            tabBarLabel: 'Lost & Found',
          }}
        />
        <Tabs.Screen
          name="(findTeammates)"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="users" size={size} color={color} />
            ),
            tabBarLabel: 'Find Teammates',
          }}
        />
      </Tabs>
    </>
  );
};

export default RootLayout;