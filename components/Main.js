import React, { useState, useRef, useMemo, useCallback } from "react";
import { StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity, Button } from "react-native";

import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { Header, Icon, Avatar, Badge, BottomSheet} from "react-native-elements";
import { useFonts } from "expo-font";

//デバイスの横幅、高さ、倍率
const { width, height, scale } = Dimensions.get("window");

const Main = (nav) => {
  const [profileCardSize, setProfileCardSize] = useState({"height": 0, "width": 0});
  const [BottomSheetVisible, setBottomSheetVisible] = useState(false);

  let [fontsLoaded] = useFonts({
    "Arista-Pro": require("../assets/fonts/aristapro-fat.otf"),
    "Fredoka-One": require("../assets/fonts/FredokaOne-Regular.otf"),
    "Kazesawa-Bold": require("../assets/fonts/Kazesawa-Bold.ttf"),
    "Kazesawa-Extrabold": require("../assets/fonts/Kazesawa-Extrabold.ttf"),
    "Kazesawa-Light": require("../assets/fonts/Kazesawa-Light.ttf"),
    "Kazesawa-Regular": require("../assets/fonts/Kazesawa-Regular.ttf"),
    "DSEG7Classic-Bold": require("../assets/fonts/DSEG7Classic-Bold.ttf")
  });

  const userData = [
    {id: "0", name: "手塚 朱里", icon: require("../assets/profileIcon_5.jpg"), comment: "失敬失敬", location: "東京都 青梅市", datetime: "18:10", cnt: "3"},
    {id: "1", name: "高橋 周吾", icon: require("../assets/profileIcon_4.png"), comment: "ふざけたこと抜かしてんじゃねーぞボケ", location: "東京都 町田市", datetime: "14:00", cnt: "15"},
    {id: "2", name: "天々座 理世", icon: require("../assets/profileIcon_3.jpg"), comment: "この私が断罪してくれる！", location: "東京都 清瀬市", datetime: "13:30", cnt: "130"},
    {id: "3", name: "涼風 青葉", icon: require("../assets/profileIcon_2.jpg"), comment: "今日も一日がんばるぞい！", location: "神奈川県 藤沢市", datetime: "13:20", cnt: "95"},
    {id: "4", name: "手塚 朱里", icon: require("../assets/profileIcon_5.jpg"), comment: "失敬失敬", location: "東京都 青梅市", datetime: "18:10", cnt: "3"},
    {id: "5", name: "高橋 周吾", icon: require("../assets/profileIcon_4.png"), comment: "ふざけたこと抜かしてんじゃねーぞボケ", location: "東京都 町田市", datetime: "14:00", cnt: "15"},
    {id: "6", name: "天々座 理世", icon: require("../assets/profileIcon_3.jpg"), comment: "この私が断罪してくれる！", location: "東京都 清瀬市", datetime: "13:30", cnt: "130"},
    {id: "7", name: "涼風 青葉", icon: require("../assets/profileIcon_2.jpg"), comment: "今日も一日がんばるぞい！", location: "神奈川県 藤沢市", datetime: "13:20", cnt: "95"},
  ]

  const SNS = [
    {id: "0", name: "Instagram", gradient: ["#eec35d", "#f7762b", "#d52a7b", "#9536b0", "#4f64d2"]},
    {id: "2", name: "Twitter", gradient: ["#03dffc", "#1da1f2", "#0341fc", "#0703fc"]},
    {id: "3", name: "TikTok", gradient: ["#fff", "#22f4ef", "#000", "#fe2a56", "#fff"]},
    {id: "4", name: "Spotify", gradient: ["#c3fa37", "#1ccc5b"]},
    {id: "5", name: "YouTube", gradient: ["#ff7e21", "#ff0000"]},
  ]

  const toggleBottomSheet = () => {
    if(!(BottomSheetVisible)){
      setBottomSheetVisible(true);
    }
  }

  const closeBottomSheet = () => {
    setBottomSheetVisible(false);
  }

  //フォントのロードが終了していたらコンポーネントを表示する
  if(!fontsLoaded){
    return null;
  }else{
    return (
      <>
        <Header backgroundColor="#FFF" placement="center" leftContainerStyle={{flex: 8}} rightContainerStyle={{flex: 4}}
          leftComponent={<><Text style={styles.headerText}>PEACH</Text></>}
          rightComponent={<View style={styles.rightComponentPosition}>
                            <TouchableOpacity onPress={() => toggleBottomSheet()}>
                              <Avatar rounded source={require("../assets/profileIcon_1.jpg")} size={width * 0.1066} />
                            </TouchableOpacity>                            
                          </View>}
        />

        <View style={styles.body}>

          <Text>Height: {height}</Text>
          <Text>Width: {width}</Text>
          <Text>ProfileCardHeight: {profileCardSize.height}</Text>
          <Text>ProfileCardWidth: {profileCardSize.width}</Text>
          <FlatList
            data = {userData}
            renderItem = {({item}) => (
              <View style={styles.profileCard} onLayout={(e) => { setProfileCardSize({"height": e.nativeEvent.layout.height, "width": e.nativeEvent.layout.width}); }}>
                  <View style={styles.profileCardHeader}>
                    <View style={styles.profileCardHeaderLocation}>
                      <Icon type="font-awesome-5" name="map-marker-alt" color="#757575" size={profileCardSize.height * 0.121212} containerStyle={{justifyContent: "center", alignItems: "stretch"}} />
                      <Text style={styles.profileCardHeaderLocationText}>{item.location}</Text>
                    </View>
                    <Text style={styles.dseg}>{item.datetime}</Text>
                  </View>
                <LinearGradient
                  colors={["#00FFFF", "#17C8FF", "#329BFF", "#4C64FF", "#6536FF", "#8000FF"]}
                  start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                  style={{ height: height * 0.004}}
                />
                <View style={styles.profileCardBody}>
                    <View>
                        <Avatar rounded source={item.icon} size={width * 0.18666} />
                        <Badge value="6" containerStyle={{position: "relative", top: height * 0.015 * -1}} badgeStyle={{backgroundColor: "#ff8ab5"}} />
                    </View>
                    <View style={styles.profileCardBodyItems}>
                      <Text style={{fontFamily: "Kazesawa-Bold", fontSize: height * 0.0299}}>{item.name}</Text>
                      <Text style={{fontFamily: "Kazesawa-Regular", paddingLeft: width * 0.00533, marginBottom: height * 0.00749}}>{item.comment}</Text>
                        <View style={styles.profileCardBodySNSFlatList}>
                            <FlatList horizontal = {true} showsHorizontalScrollIndicator={false} fadingEdgeLength={width * 0.19444}
                              data = {SNS}
                              renderItem = {({item}) => (
                                <LinearGradient
                                  colors={item.gradient}
                                  start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 0.0}}
                                  style={styles.profileCardBodySNSFlatListLinearGradient}
                                >
                                  <Text style={styles.profileCardBodySNSFlatListText}>{item.name}</Text>
                                </LinearGradient>
                              )} 
                              keyExtractor={SNS => SNS.id}
                            />
                        </View>
                    </View>
                  </View>
              </View>
            )} 
            keyExtractor={userData => userData.id}
          />
          <StatusBar style="auto" />
        </View>

        <BottomSheet containerStyle={{ backgroundColor: "gray", marginTop: 150, marginHorizontal: 15, borderRadius: 30, marginBottom: -30}} isVisible={BottomSheetVisible}>
          <View style={{backgroundColor: "#fff", marginBottom: 450}}>
            <Button title="Close" onPress={closeBottomSheet} />
            <Text>BottomSheet</Text>
          </View>
        </BottomSheet>

      </>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
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
  },
  profileCardBody: {
    marginTop: height * 0.007,
    paddingLeft: width * 0.0266,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 5
  },
  profileCardBodyItems: {
    marginLeft: width * 0.0266,
    paddingTop: height * 0.00449
  },
  profileCardBodySNSFlatList: {
    flexDirection: "row",
    maxWidth: width * 0.69333,
    marginLeft: width * 0.04 * -1,
    marginTop: height * 0.00449
  },
  profileCardBodySNSFlatListLinearGradient: {
    height: height * 0.02998,
    width: width * 0.21333,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginHorizontal: width * 0.00533
  },
  profileCardBodySNSFlatListText: {
    textAlign: "center",
    color: "#FFF",
    flex: 1,
    paddingTop: height * 0.00168,
    fontFamily: "Kazesawa-Bold",
    fontSize: height * 0.02
  }
});

export default Main;