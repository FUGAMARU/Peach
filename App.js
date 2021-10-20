import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";

import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { Header, Icon, Avatar, Badge} from "react-native-elements";
import { useFonts } from "expo-font";

//デバイスの横幅、高さ、倍率
const { width, height, scale } = Dimensions.get("window");

export default function App() {
  const [profileCardContainerSize, setProfileCardContainerSize] = useState({"height": 0, "width": 0});
  const [profileCardSize, setProfileCardSize] = useState({"height": 0, "width": 0});

  let [fontsLoaded] = useFonts({
    "Arista-Pro": require("./assets/fonts/aristapro-fat.otf"),
    "Fredoka-One": require("./assets/fonts/FredokaOne-Regular.otf"),
    "Kazesawa-Bold": require("./assets/fonts/Kazesawa-Bold.ttf"),
    "Kazesawa-Extrabold": require("./assets/fonts/Kazesawa-Extrabold.ttf"),
    "Kazesawa-Light": require("./assets/fonts/Kazesawa-Light.ttf"),
    "Kazesawa-Regular": require("./assets/fonts/Kazesawa-Regular.ttf"),
    "DSEG7Classic-Bold": require("./assets/fonts/DSEG7Classic-Bold.ttf")
  });

  //フォントのロードが終了していたらコンポーネントを表示する
  if(!fontsLoaded){
    return null;
  }else{
    return (
      <>
        <Header backgroundColor="#FFF" placement="center" leftContainerStyle={{flex: 8}} rightContainerStyle={{flex: 4}}
          leftComponent={<><Text style={styles.headerText}>PEACH</Text></>}
          rightComponent={<View style={styles.rightComponentPosition}>
                            <Avatar rounded source={require("./assets/profileIcon_1.jpg")} size={width * 0.1066} />                              
                          </View>}
        />

        <View style={styles.profileCardContainer} onLayout={(e) => { setProfileCardContainerSize({"height": e.nativeEvent.layout.height, "width": e.nativeEvent.layout.width}); }}>
          <View style={{height: profileCardContainerSize.height * (profileCardSize.height / setProfileCardContainerSize.height)}, styles.profileCard} onLayout={(e) => { setProfileCardSize({"height": e.nativeEvent.layout.height, "width": e.nativeEvent.layout.width}); }}>
            <Text style={styles.dseg}>16:31</Text>
            <LinearGradient
              colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']}
              start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
              style={{ height: profileCardSize.height * 0.025}}
            />
            <View style={{ marginTop: profileCardSize.height * 0.083, paddingLeft: profileCardSize.width * 0.0289, flexDirection: "row"}}>
                  <View>
                      <Avatar rounded source={require("./assets/profileIcon_4.png")} size={profileCardSize.width * 0.2028} />
                      <Badge value="25" containerStyle={{position: "relative", top: profileCardSize.height * 0.04166 * -1}} badgeStyle={{backgroundColor: "#ff8ab5"}} />
                  </View>
                  <View style={{marginLeft: profileCardSize.width * 0.028, paddingTop: profileCardSize.height * 0.10212}}>
                    <Text style={{fontFamily: "Kazesawa-Bold", fontSize: profileCardSize.height * 0.175}}>周吾</Text>
                    <Text style={{fontFamily: "Kazesawa-Regular"}}>ふざけたこと抜かしてんじゃねーぞボケ</Text>
                  </View>
            </View>
          </View>
        </View>

        <View style={styles.profileCardContainer} onLayout={(e) => { setProfileCardContainerSize({"height": e.nativeEvent.layout.height, "width": e.nativeEvent.layout.width}); }}>
          <View style={{height: profileCardContainerSize.height * (profileCardSize.height / setProfileCardContainerSize.height)}, styles.profileCard} onLayout={(e) => { setProfileCardSize({"height": e.nativeEvent.layout.height, "width": e.nativeEvent.layout.width}); }}>
            <Text style={styles.dseg}>15:48</Text>
            <LinearGradient
              colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']}
              start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
              style={{ height: profileCardSize.height * 0.025}}
            />
            <View style={{ marginTop: profileCardSize.height * 0.083, paddingLeft: profileCardSize.width * 0.0289, flexDirection: "row"}}>
                  <View>
                      <Avatar rounded source={require("./assets/profileIcon_3.jpg")} size={profileCardSize.width * 0.2028} />
                      <Badge value="156" containerStyle={{position: "relative", top: profileCardSize.height * 0.04166 * -1}} badgeStyle={{backgroundColor: "#ff8ab5"}} />
                  </View>
                  <View style={{marginLeft: profileCardSize.width * 0.028, paddingTop: profileCardSize.height * 0.10212}}>
                    <Text style={{fontFamily: "Kazesawa-Bold", fontSize: profileCardSize.height * 0.175}}>リゼ</Text>
                    <Text style={{fontFamily: "Kazesawa-Regular"}}>この私が断罪してくれる！</Text>
                  </View>
            </View>
          </View>
        </View>
        
        <View style={styles.profileCardContainer} onLayout={(e) => { setProfileCardContainerSize({"height": e.nativeEvent.layout.height, "width": e.nativeEvent.layout.width}); }}>
          <View style={{height: profileCardContainerSize.height * (profileCardSize.height / setProfileCardContainerSize.height)}, styles.profileCard} onLayout={(e) => { setProfileCardSize({"height": e.nativeEvent.layout.height, "width": e.nativeEvent.layout.width}); }}>
            <Text style={styles.dseg}>15:30</Text>
            <LinearGradient
              colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']}
              start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
              style={{ height: profileCardSize.height * 0.025}}
            />
            <View style={{ marginTop: profileCardSize.height * 0.083, paddingLeft: profileCardSize.width * 0.0289, flexDirection: "row"}}>
                  <View>
                      <Avatar rounded source={require("./assets/profileIcon_2.jpg")} size={profileCardSize.width * 0.2028} />
                      <Badge value="92" containerStyle={{position: "relative", top: profileCardSize.height * 0.04166 * -1}} badgeStyle={{backgroundColor: "#ff8ab5"}} />
                  </View>
                  <View style={{marginLeft: profileCardSize.width * 0.028, paddingTop: profileCardSize.height * 0.10212}}>
                    <Text style={{fontFamily: "Kazesawa-Bold", fontSize: profileCardSize.height * 0.175}}>涼風 青葉</Text>
                    <Text style={{fontFamily: "Kazesawa-Regular"}}>今日も一日がんばるぞい！</Text>
                  </View>
            </View>
          </View>
        </View>

        <View style={styles.container}>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Height: {height}</Text>
          <Text>Width: {width}</Text>
          <Text>ProfileCardContainerHeight: {profileCardContainerSize.height}</Text>
          <Text>ProfileCardContainerWidth: {profileCardContainerSize.width}</Text>
          <Text>ProfileCardHeight: {profileCardSize.height}</Text>
          <Text>ProfileCardWidth: {profileCardSize.width}</Text>
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
  profileCardContainer: {
    backgroundColor: "#ededed",
    paddingTop: height * 0.02998,
    paddingBottom: height * 0.01499
  },
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginLeft: width * 0.04,
    marginRight: width * 0.04,
    /* Shadow */
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 7
  },
  dseg: {
    fontSize: width * 0.0333,
    padding: width * 0.008,
    paddingRight: width * 0.018666,
    color: "#757575",
    fontFamily: "DSEG7Classic-Bold",
    textAlign: "right"
  }
});
