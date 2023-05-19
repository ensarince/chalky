import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import tw from "twrnc";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth';
import * as WebBrowser from 'expo-web-browser';
import useAuth from '../hooks/useAuth';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  const { updateUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateUser(user);
      })
      .catch((error) => {
        console.error('Error signing up:', error);
      });
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateUser(user);
      })
      .catch((error) => {
        console.error('Error signing in:', error);
      });
  };

  return (
    <View style={tw`flex-1 items-center justify-center bg-white`}>
      <TextInput
        placeholder="Enter email"
        onChangeText={setEmail}
        style={tw`border-b-2 border-gray-400 mb-4 px-4 py-2 w-80`}
      />
      <TextInput
        placeholder="Enter password"
        onChangeText={setPassword}
        secureTextEntry
        style={tw`border-b-2 border-gray-400 mb-4 px-4 py-2 w-80`}
      />
      <View style={tw`flex flex-row justify-center gap-4`}>
        <Button onPress={handleSignUp} title="Sign up" style={tw`mr-4`} />
        <Button onPress={handleSignIn} title="Sign in" />
      </View>
    </View>
  );
};

export default LoginScreen;
