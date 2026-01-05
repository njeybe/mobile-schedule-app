import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import Screens
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import AddScheduleScreen from './src/screens/AddScheduleScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        
        {/* Auth Screens */}
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{ headerShown: false }} 
        />

        {/* App Screens */}
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'My Schedule', headerLeft: null }} 
        />
        <Stack.Screen 
          name="AddSchedule" 
          component={AddScheduleScreen} 
          options={{ title: 'Add New Task' }} 
        />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}