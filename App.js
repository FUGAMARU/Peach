import { StatusBar } from "expo-status-bar";
import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { useFonts } from "expo-font";

import Main from "./components/Main";
import Top from "./components/tops/Top";
import Register from "./components/tops/Register";
import Settings from "./components/Settings";
import UploadTest from "./components/tops/UploadTest";
import TestFirestore from "./components/tops/TestFirestore";

import * as firebase from "firebase";
import forFirebaseInitialization from "./forFirebaseInitialization";

if(firebase.apps.length === 0){
  firebase.initializeApp(forFirebaseInitialization);
}

const Stack = createStackNavigator();
const RootStack = () => {
  return (
      <Stack.Navigator initialRouteName="Main" screenOptions={{headerShown: false}}>
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="Top" component={Top} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="UploadTest" component={UploadTest} />
          <Stack.Screen name="TestFirestore" component={TestFirestore} />
          <Stack.Screen name="Settings" component={Settings} options={{headerShown: true}} />
      </Stack.Navigator>
  );
};

const App = () => {
  let [fontsLoaded] = useFonts({
    "Arista-Pro": require("./assets/fonts/aristapro-fat.otf"),
    "Fredoka-One": require("./assets/fonts/FredokaOne-Regular.otf"),
    "Kazesawa-Bold": require("./assets/fonts/Kazesawa-Bold.ttf"),
    "Kazesawa-Extrabold": require("./assets/fonts/Kazesawa-Extrabold.ttf"),
    "Kazesawa-Light": require("./assets/fonts/Kazesawa-Light.ttf"),
    "Kazesawa-Regular": require("./assets/fonts/Kazesawa-Regular.ttf"),
    "DSEG7Classic-Bold": require("./assets/fonts/DSEG7Classic-Bold.ttf"),
    "OCRAEXT": require("./assets/fonts/OCRAEXT.ttf")
  });

  if(!fontsLoaded){
    return null;
  }else{
    return (
      <>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
        <StatusBar style="auto" />
      </>
    );
  }
}

export default App;