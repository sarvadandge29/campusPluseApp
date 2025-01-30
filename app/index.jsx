import React from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { Redirect, useRouter } from 'expo-router';
import CustomButton from '../components/CustmonButton';
import images from '../constants/images';
import { useAuth } from '../context/AuthContext';

const Index = () => {
  const router = useRouter();
  const { session, loading } = useAuth();

  const handleContinueWithEmail = () => {
    router.push('/signIn');
  };

  if (loading) {
    return(
      <View className="items-center justify-center flex-1 flex-row">
        <ActivityIndicator size='large' color='blue'/>
        <Text> Loading...</Text>
      </View>
    )
  }

  if (!loading && session) {
    return <Redirect href='/chat'/>
  }

  return (
    <View className="w-full items-center flex-center flex-1">
      <Image
        source={images.IndexImage}
        className="w-32 h-32 mb-6 mt-24"
        resizeMode="contain"
      />

      <Text className="text-4xl font-bold leading-tight text-center">
        Campus Pulse {'\n'}
        <Text className="text-primary">Connect. Collaborate. Celebrate.</Text>
      </Text>
      <Text className="mt-6 ml-3 mr-3 text-gray-700 text-lg text-center">
        Welcome to Campus Pulse, the one-stop platform designed exclusively for college students like you to connect, collaborate, and thrive. Whether you're looking to join a hackathon team, find the perfect flatmate, dive into exciting college events, or simply build a network of like-minded peers, Campus Pulse is here to make your college experience unforgettable.
      </Text>

      <CustomButton
        title="Continue With Email"
        handlePress={handleContinueWithEmail}
        containerStyles="mt-7 w-[60%] h-[48] border border-black rounded-[5px]"
        textStyle="text-blue"
        isLoading={false}
      />
    </View>
  );
};

export default Index;