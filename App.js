import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";

import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { Header, Icon, Avatar, Badge} from "react-native-elements";
import { useFonts } from "expo-font";

//デバイスの横幅、高さ、倍率
const { width, height, scale } = Dimensions.get("window");

export default function App() {
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
      <View style={styles.body}>
      <ScrollView>

          <View style={styles.profileCard} onLayout={(e) => { setProfileCardSize({"height": e.nativeEvent.layout.height, "width": e.nativeEvent.layout.width}); }}>
              <View style={styles.profileCardHeader}>
                <View style={styles.profileCardHeaderLocation}>
                  <Icon type="font-awesome-5" name="map-marker-alt" color="#757575" size={height * 0.022} containerStyle={{justifyContent: "center", alignItems: "stretch"}} />
                  <Text style={styles.profileCardHeaderLocationText}>東京都 町田市</Text>
                </View>
                <Text style={styles.dseg}>16:24</Text>
              </View>
            <LinearGradient
              colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']}
              start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
              style={{ height: height * 0.004}}
            />
            <View style={{ marginTop: height * 0.007, paddingLeft: width * 0.0266, flexDirection: "row"}}>
                  <View>
                      <Avatar rounded source={require("./assets/profileIcon_4.png")} size={width * 0.18666} />
                      <Badge value="6" containerStyle={{position: "relative", top: -10}} badgeStyle={{backgroundColor: "#ff8ab5"}} />
                  </View>
                  <View style={{marginLeft: width * 0.0266, paddingTop: height * 0.02244}}>
                    <Text style={{fontFamily: "Kazesawa-Bold", fontSize: height * 0.0299}}>高橋 周吾</Text>
                    <Text style={{fontFamily: "Kazesawa-Regular"}}>今日も一日がんばるぞい！</Text>
                  </View>
            </View>
          </View>

          <View style={styles.profileCard} onLayout={(e) => { setProfileCardSize({"height": e.nativeEvent.layout.height, "width": e.nativeEvent.layout.width}); }}>
              <View style={styles.profileCardHeader}>
                <View style={styles.profileCardHeaderLocation}>
                  <Icon type="font-awesome-5" name="map-marker-alt" color="#757575" size={height * 0.022} containerStyle={{justifyContent: "center", alignItems: "stretch"}} />
                  <Text style={styles.profileCardHeaderLocationText}>東京都 清瀬市</Text>
                </View>
                <Text style={styles.dseg}>15:45</Text>
              </View>
            <LinearGradient
              colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']}
              start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
              style={{ height: height * 0.004}}
            />
            <View style={{ marginTop: height * 0.007, paddingLeft: width * 0.0266, flexDirection: "row"}}>
                  <View>
                      <Avatar rounded source={require("./assets/profileIcon_3.jpg")} size={width * 0.18666} />
                      <Badge value="153" containerStyle={{position: "relative", top: -10}} badgeStyle={{backgroundColor: "#ff8ab5"}} />
                  </View>
                  <View style={{marginLeft: width * 0.0266, paddingTop: height * 0.02244}}>
                    <Text style={{fontFamily: "Kazesawa-Bold", fontSize: height * 0.0299}}>天々座 理世</Text>
                    <Text style={{fontFamily: "Kazesawa-Regular"}}>この私が断罪してくれる！</Text>
                  </View>
            </View>
          </View>

          <View style={styles.profileCard} onLayout={(e) => { setProfileCardSize({"height": e.nativeEvent.layout.height, "width": e.nativeEvent.layout.width}); }}>
              <View style={styles.profileCardHeader}>
                <View style={styles.profileCardHeaderLocation}>
                  <Icon type="font-awesome-5" name="map-marker-alt" color="#757575" size={height * 0.022} containerStyle={{justifyContent: "center", alignItems: "stretch"}} />
                  <Text style={styles.profileCardHeaderLocationText}>神奈川県 藤沢市</Text>
                </View>
                <Text style={styles.dseg}>15:30</Text>
              </View>
            <LinearGradient
              colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']}
              start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
              style={{ height: height * 0.004}}
            />
            <View style={{ marginTop: height * 0.007, paddingLeft: width * 0.0266, flexDirection: "row"}}>
                  <View>
                      <Avatar rounded source={require("./assets/profileIcon_2.jpg")} size={width * 0.18666} />
                      <Badge value="92" containerStyle={{position: "relative", top: -10}} badgeStyle={{backgroundColor: "#ff8ab5"}} />
                  </View>
                  <View style={{marginLeft: width * 0.0266, paddingTop: height * 0.02244}}>
                    <Text style={{fontFamily: "Kazesawa-Bold", fontSize: height * 0.0299}}>涼風 青葉</Text>
                    <Text style={{fontFamily: "Kazesawa-Regular"}}>今日も一日がんばるぞい！</Text>
                  </View>
            </View>
          </View>

          <View style={styles.profileCard} onLayout={(e) => { setProfileCardSize({"height": e.nativeEvent.layout.height, "width": e.nativeEvent.layout.width}); }}>
              <View style={styles.profileCardHeader}>
                <View style={styles.profileCardHeaderLocation}>
                  <Icon type="font-awesome-5" name="map-marker-alt" color="#757575" size={height * 0.022} containerStyle={{justifyContent: "center", alignItems: "stretch"}} />
                  <Text style={styles.profileCardHeaderLocationText}>東京都 町田市</Text>
                </View>
                <Text style={styles.dseg}>16:24</Text>
              </View>
            <LinearGradient
              colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']}
              start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
              style={{ height: height * 0.004}}
            />
            <View style={{ marginTop: height * 0.007, paddingLeft: width * 0.0266, flexDirection: "row"}}>
                  <View>
                      <Avatar rounded source={require("./assets/profileIcon_4.png")} size={width * 0.18666} />
                      <Badge value="6" containerStyle={{position: "relative", top: -10}} badgeStyle={{backgroundColor: "#ff8ab5"}} />
                  </View>
                  <View style={{marginLeft: width * 0.0266, paddingTop: height * 0.02244}}>
                    <Text style={{fontFamily: "Kazesawa-Bold", fontSize: height * 0.0299}}>高橋 周吾</Text>
                    <Text style={{fontFamily: "Kazesawa-Regular"}}>今日も一日がんばるぞい！</Text>
                  </View>
            </View>
          </View>

          <View style={styles.profileCard} onLayout={(e) => { setProfileCardSize({"height": e.nativeEvent.layout.height, "width": e.nativeEvent.layout.width}); }}>
              <View style={styles.profileCardHeader}>
                <View style={styles.profileCardHeaderLocation}>
                  <Icon type="font-awesome-5" name="map-marker-alt" color="#757575" size={height * 0.022} containerStyle={{justifyContent: "center", alignItems: "stretch"}} />
                  <Text style={styles.profileCardHeaderLocationText}>東京都 清瀬市</Text>
                </View>
                <Text style={styles.dseg}>15:45</Text>
              </View>
            <LinearGradient
              colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']}
              start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
              style={{ height: height * 0.004}}
            />
            <View style={{ marginTop: height * 0.007, paddingLeft: width * 0.0266, flexDirection: "row"}}>
                  <View>
                      <Avatar rounded source={require("./assets/profileIcon_3.jpg")} size={width * 0.18666} />
                      <Badge value="153" containerStyle={{position: "relative", top: -10}} badgeStyle={{backgroundColor: "#ff8ab5"}} />
                  </View>
                  <View style={{marginLeft: width * 0.0266, paddingTop: height * 0.02244}}>
                    <Text style={{fontFamily: "Kazesawa-Bold", fontSize: height * 0.0299}}>天々座 理世</Text>
                    <Text style={{fontFamily: "Kazesawa-Regular"}}>この私が断罪してくれる！</Text>
                  </View>
            </View>
          </View>

          <View style={styles.profileCard} onLayout={(e) => { setProfileCardSize({"height": e.nativeEvent.layout.height, "width": e.nativeEvent.layout.width}); }}>
              <View style={styles.profileCardHeader}>
                <View style={styles.profileCardHeaderLocation}>
                  <Icon type="font-awesome-5" name="map-marker-alt" color="#757575" size={height * 0.022} containerStyle={{justifyContent: "center", alignItems: "stretch"}} />
                  <Text style={styles.profileCardHeaderLocationText}>神奈川県 藤沢市</Text>
                </View>
                <Text style={styles.dseg}>15:30</Text>
              </View>
            <LinearGradient
              colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']}
              start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
              style={{ height: height * 0.004}}
            />
            <View style={{ marginTop: height * 0.007, paddingLeft: width * 0.0266, flexDirection: "row"}}>
                  <View>
                      <Avatar rounded source={require("./assets/profileIcon_2.jpg")} size={width * 0.18666} />
                      <Badge value="92" containerStyle={{position: "relative", top: -10}} badgeStyle={{backgroundColor: "#ff8ab5"}} />
                  </View>
                  <View style={{marginLeft: width * 0.0266, paddingTop: height * 0.02244}}>
                    <Text style={{fontFamily: "Kazesawa-Bold", fontSize: height * 0.0299}}>涼風 青葉</Text>
                    <Text style={{fontFamily: "Kazesawa-Regular"}}>今日も一日がんばるぞい！</Text>
                  </View>
            </View>
          </View>

          <Text>Height: {height}</Text>
          <Text>Width: {width}</Text>
          <Text>ProfileCardHeight: {profileCardSize.height}</Text>
          <Text>ProfileCardWidth: {profileCardSize.width}</Text>
          <StatusBar style="auto" />
        {//<Text><Icon type="ionicon" name="cog-outline" color="#4d4d4d" size={34} /></Text>
        }
        </ScrollView>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#ededed"
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
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginLeft: width * 0.04,
    marginRight: width * 0.04,
    flex: 1,
    marginTop: 20,
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
  profileCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  profileCardHeaderLocation: {
    flexDirection: "row",
    paddingLeft: width * 0.0266
  },
  profileCardHeaderLocationText: {
    justifyContent: "center",
    alignItems: "stretch", 
    fontFamily: "Kazesawa-Light", 
    marginLeft: width * 0.008
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
