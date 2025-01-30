import React from 'react';
import { View, Text, Image } from 'react-native';
import { useRouter } from 'expo-router';
import CustomButton from '../components/CustmonButton';
import images from '../constants/images';


const Index = () => {
  const router = useRouter();

  const handleContinueWithEmail = () => {
    console.log('Continue With Email pressed');
    router.push('/signIn');
  };

  return (
    <View className="w-full items-center flex-center">
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
        containerStyles="mt-10 w-[60%] h-[48] border border-black rounded-[5px]"
        textStyle="text-blue"
        isLoading={false}
      />
    </View>
  );
};

export default Index;