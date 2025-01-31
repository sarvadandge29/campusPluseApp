import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import UserCard from '../../components/UserCard';

const Chat = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat With</Text>
      <UserCard />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f7fafc',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a202c',
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default Chat;