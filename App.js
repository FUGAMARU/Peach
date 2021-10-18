import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

import { Header, Icon } from 'react-native-elements';
import { useFonts } from 'expo-font';

//デバイスの横幅、高さ、倍率
const { width, height, scale } = Dimensions.get('window');

export default function App() {
  let [fontsLoaded] = useFonts({
    "Arista-Pro": require("./assets/fonts/aristapro-fat.otf"),
    "Fredoka-One": require("./assets/fonts/FredokaOne-Regular.otf"),
  });

  //フォントのロードが終了していたらコンポーネントを表示する
  if(!fontsLoaded){
    return null;
  }else{
    return (
      <>
          <Header backgroundColor="#FFF" placement="center" leftContainerStyle={{flex: 8}} rightContainerStyle={{flex: 4}}
            leftComponent={<Text style={styles.headerText}>PEACH</Text>}
            rightComponent={<Text style={styles.cogIcon}><Icon type="ionicon" name="cog-outline" color="#4d4d4d" size={30} /></Text>}
          />

        <View style={styles.container}>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>{height}</Text>
          <StatusBar style="auto" />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ededed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: "#ff4a92",
    fontSize: height * 0.045,
    fontFamily: "Arista-Pro",
    marginTop: height * 0.015,
    marginLeft: height * 0.015
  },
  cogIcon: {
    marginTop: height * 0.019
  }
});
