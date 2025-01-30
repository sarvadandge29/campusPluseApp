import { View, Text, TextInput, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import CustomButton from '../../components/CustmonButton';
import images from '../../constants/images';

const SignUp = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [branch, setBranch] = useState('');
  const [year, setYear] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Image
          source={images.IndexImage}
          className="w-32 h-32 mb-6"
          resizeMode="contain"
        />
        <Text className="text-2xl font-bold text-gray-800 mb-8">Create an Account 🚀</Text>

        <TextInput
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          className="w-full max-w-[80%] border border-gray-400 rounded-lg p-4 bg-white mb-4 shadow-sm"
        />

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          className="w-full max-w-[80%] border border-gray-400 rounded-lg p-4 bg-white mb-4 shadow-sm"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Branch"
          value={branch}
          onChangeText={setBranch}
          className="w-full max-w-[80%] border border-gray-400 rounded-lg p-4 bg-white mb-4 shadow-sm"
        />

        <TextInput
          placeholder="Year"
          value={year}
          onChangeText={setYear}
          className="w-full max-w-[80%] border border-gray-400 rounded-lg p-4 bg-white mb-4 shadow-sm"
          keyboardType="numeric"
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          className="w-full max-w-[80%] border border-gray-400 rounded-lg p-4 bg-white mb-6 shadow-sm"
          secureTextEntry
        />

        <CustomButton
          title="Sign Up"
          handlePress={handleSignUp}
          containerStyles="w-full max-w-[80%] bg-blue-600 p-4 rounded-lg shadow-md"
          textStyle="text-white font-semibold text-lg"
        />

        <Text className="text-gray-600 mt-4">
          Already have an account?
          <Text
            className="text-blue-600 font-semibold"
            onPress={() => router.push('/signIn')}
          >
            {' '}Sign In
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

export default SignUp;
