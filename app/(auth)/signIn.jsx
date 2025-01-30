import { View, Text, TextInput, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import CustomButton from '../../components/CustmonButton';
import images from '../../constants/images';
import { supabase } from "../../utils/supabase/client";

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        Alert.alert('Error', error.message);
      } else {
        router.push('/chat');
      }
    } catch (err) {
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-100">
      <Image
        source={images.IndexImage}
        className="w-32 h-32 mb-6"
        resizeMode="contain"
      />
      <Text className="text-2xl font-bold text-gray-800 mb-8">Welcome Back 👋</Text>

      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        className="w-full max-w-[80%] border border-gray-400 rounded-lg p-4 bg-white mb-4 shadow-sm"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        className="w-full max-w-[80%] border border-gray-400 rounded-lg p-4 bg-white mb-6 shadow-sm"
        secureTextEntry
      />

      <CustomButton
        title={loading ? "Signing In..." : "Sign In"}
        handlePress={handleSignIn}
        containerStyles="w-full max-w-[80%] bg-blue-600 p-4 rounded-lg shadow-md"
        textStyle="text-white font-semibold text-lg"
        disabled={loading}
      />

      <Text className="text-gray-600 mt-4">
        Don't have an account?{' '}
        <Text className="text-blue-600 font-semibold" onPress={() => router.push('/signUp')}>
          Sign Up
        </Text>
      </Text>
    </View>
  );
};

export default SignIn;