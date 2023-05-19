import React from 'react'
import HomeScreen from './screens/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import useAuth from './hooks/useAuth';
import MatchScreen from './screens/MatchScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createNativeStackNavigator();


const StackNavigator = () => {

  const { user } = useAuth();

  return (
    
    <Stack.Navigator>
      {user ? 
            (
            <>
            <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
            <Stack.Screen name="Matches" component={MatchScreen} options={{headerShown:false}}/>
            <Stack.Screen name="Profile" component={ProfileScreen} options={{headerShown:false}}/>
            </>
            ):
            (
          <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
          )
        }
    </Stack.Navigator>
  )
}

export default StackNavigator