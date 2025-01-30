import { View, Text, TextInput, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import CustomButton from '../../components/CustmonButton';
import images from '../../constants/images';
import { Feather } from '@expo/vector-icons';
import { supabase } from '../../utils/supabase/client';

const SignUp = () => {
  const router = useRouter();

  // State variables
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [department, setDepartment] = useState('');
  const [skills, setSkills] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSignUp = async () => {
    if (phoneNumber.length !== 10 || !/^\d+$/.test(phoneNumber)) {
      setError('Phone number must be exactly 10 digits.');
      return;
    }

    if (!gender || !department || !skills || !hobbies) {
      setError('All fields are required.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      const user = data?.user;
      await supabase.auth.updateUser({ data: { display_name: username } });

      const { error: insertError } = await supabase.from('users').insert([
        {
          userid: user?.id,
          name: username,
          email: user?.email,
          phonenumber: phoneNumber,
          gender,
          usertype: 'student',
          department,
          skills,
          hobbies,
        },
      ]);

      if (insertError) throw insertError;

      setSuccessMessage('Sign up successful! Redirecting...');
      setTimeout(() => router.push('/chat'), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 justify-center items-center bg-gray-100 p-6">
        <Image source={images.IndexImage} className="w-32 h-32 mb-6" resizeMode="contain" />
        <Text className="text-2xl font-bold text-gray-800 mb-8">Create an Account 🚀</Text>

        {error && <Text className="text-red-500 mb-4">{error}</Text>}
        {successMessage && <Text className="text-green-500 mb-4">{successMessage}</Text>}

        {/* Full Name */}
        <TextInput
          placeholder="Full Name"
          value={username}
          onChangeText={setUsername}
          className="w-full max-w-[80%] border border-gray-400 rounded-lg p-4 bg-white mb-4 shadow-sm"
        />

        {/* Email */}
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          className="w-full max-w-[80%] border border-gray-400 rounded-lg p-4 bg-white mb-4 shadow-sm"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Phone Number */}
        <TextInput
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          className="w-full max-w-[80%] border border-gray-400 rounded-lg p-4 bg-white mb-4 shadow-sm"
          keyboardType="phone-pad"
        />

        {/* Gender Picker */}
        <View className="w-full max-w-[80%] border border-gray-400 rounded-lg bg-white mb-4 shadow-sm">
          <Picker selectedValue={gender} onValueChange={setGender}>
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View>

        {/* Department Picker */}
        <View className="w-full max-w-[80%] border border-gray-400 rounded-lg bg-white mb-4 shadow-sm">
          <Picker selectedValue={department} onValueChange={setDepartment}>
            <Picker.Item label="Select Department" value="" />
            <Picker.Item label="CS" value="CS" />
            <Picker.Item label="IT" value="IT" />
            <Picker.Item label="AI&DS" value="AI&DS" />
            <Picker.Item label="CS(AIML)" value="CS(AIML)" />
            <Picker.Item label="CS(AI)" value="CS(AI)" />
            <Picker.Item label="CS(IOTCSBT)" value="CS(IOTCSBT)" />
            <Picker.Item label="CS(SE)" value="CS(SE)" />
            <Picker.Item label="CS(DS)" value="CS(DS)" />
            <Picker.Item label="ENTC" value="ENTC" />
            <Picker.Item label="Mech" value="Mech" />
            <Picker.Item label="Civil" value="Civil" />
          </Picker>
        </View>

        {/* Skills */}
        <TextInput
          placeholder="Skills (e.g., Programming, Design)"
          value={skills}
          onChangeText={setSkills}
          className="w-full max-w-[80%] border border-gray-400 rounded-lg p-4 bg-white mb-4 shadow-sm"
        />

        {/* Hobbies */}
        <TextInput
          placeholder="Hobbies (e.g., Reading, Gaming)"
          value={hobbies}
          onChangeText={setHobbies}
          className="w-full max-w-[80%] border border-gray-400 rounded-lg p-4 bg-white mb-4 shadow-sm"
        />

        {/* Password */}
        <View className="w-full max-w-[80%] relative mb-6">
          <TextInput
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            className="w-full border border-gray-400 rounded-lg p-4 bg-white shadow-sm"
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-4"
          >
            <Feather
              name={showPassword ? 'eye-off' : 'eye'}
              size={20}
              color="#666"
            />
          </TouchableOpacity>
        </View>

        {/* Sign Up Button */}
        <CustomButton
          title={loading ? <ActivityIndicator color="#fff" /> : 'Sign Up'}
          handlePress={handleSignUp}
          containerStyles="w-full max-w-[80%] bg-blue-600 p-4 rounded-lg shadow-md"
          textStyle="text-white font-semibold text-lg"
          disabled={loading}
        />

        {/* Sign In Link */}
        <Text className="text-gray-600 mt-4">
          Already have an account?
          <Text className="text-blue-600 font-semibold" onPress={() => router.push('/signIn')}>
            {' '}Sign In
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

export default SignUp;
