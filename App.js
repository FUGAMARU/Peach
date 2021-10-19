import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { Header, Icon, Avatar, FAB } from 'react-native-elements';
import { useFonts } from 'expo-font';


//import { FAB } from 'react-native-paper';

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
          leftComponent={<><Text style={styles.headerText}>PEACH</Text></>}
          rightComponent={<>
                            <View style={styles.rightComponentPosition}>
                              <Avatar rounded source={require("./assets/profileIcon.jpg")} size={40} />                              
                            </View>
                          </>}
        />

        <View style={styles.container}>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Height: {height}</Text>
          <Text>Width: {width}</Text>
          <StatusBar style="auto" />
        </View>
        {//<Text ><Icon type="ionicon" name="cog-outline" color="#4d4d4d" size={34} /></Text>
        }
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
    color: "#ff8ab5",
    fontSize: height * 0.045,
    fontFamily: "Arista-Pro",
    marginTop: height * 0.015,
    marginLeft: height * 0.015
  },
  rightComponentPosition: {
    flexDirection: "row",
    marginTop: height * 0.01,
    marginBottom: height * 0.1499 * -1,
    marginRight: width * 0.0186
  },
});
