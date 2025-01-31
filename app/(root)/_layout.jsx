import React from 'react';
import { Redirect, Tabs } from 'expo-router';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { StatusBar } from 'react-native';
import Header from '../../components/Header';

const RootLayout = () => {

  return (
    <>
      <StatusBar style="light" backgroundColor="#3B82F6" />
      <Header />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#3B82F6',
          tabBarInactiveTintColor: 'gray',
        }}
      >
        <Tabs.Screen
          name="chat"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="chatbubbles" size={size} color={color} />
            ),
            tabBarLabel: 'Chat',
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