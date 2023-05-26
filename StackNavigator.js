import React from 'react'
import HomeScreen from './screens/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './screens/LoginScreen';
import useAuth from './hooks/useAuth';
import MatchScreen from './screens/MatchScreen';
import ProfileScreen from './screens/ProfileScreen';
import { HomeIcon, UserIcon, HeartIcon } from 'react-native-heroicons/solid';
import CreateProfileScreen from './screens/CreateProfileScreen';
import UserScreen from './screens/UserScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const StackNavigator = () => {

  const { user } = useAuth();

  const MainStack = () => (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Create" component={CreateProfileScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );

  return (
    
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Main') {
            iconName = 'home';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          } else if (route.name === 'Matches'){
            iconName = 'matches';
          }else if (route.name === 'User'){
            iconName = 'user';
          }
          return iconName === 'home' ? (
            <HomeIcon name={iconName} size={size} color={"#D34A4E"} />
          ) : iconName === 'user' ? (
            <UserIcon name={iconName} size={size} color={"#D34A4E"} />
          ): iconName === 'matches' ? (
            <HeartIcon name={iconName} size={size} color={"#D34A4E"} />
          ): null},
      })}
    >
      {user ? (
        <>
          <Tab.Screen name="Main" component={MainStack} options={{ headerShown: false }}/>
          <Tab.Screen name="Matches" component={MatchScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="User" component={UserScreen} options={{ headerShown: false }} />
        </>
      ) : (
        /* hide the tab */
        <Tab.Screen name="Login" component={LoginScreen} options={{ headerShown: false,  tabBarStyle:{display:"none"}}}/> 
      )}
    </Tab.Navigator>
  )
}

export default StackNavigator