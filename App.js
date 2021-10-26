import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './components/Main';
import Top from './components/Top';
import Settings from './components/Settings';

const Stack = createStackNavigator();
const RootStack = () => {
  return (
      <Stack.Navigator initialRouteName="Top" screenOptions={{headerShown: false}}>
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="Top" component={Top} />
          <Stack.Screen name="Settings" component={Settings} options={{headerShown: true}} />
      </Stack.Navigator>
  );
};

const App = () => {
  return (
    <>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
      <StatusBar style="auto" />
    </>
  );
}

export default App;