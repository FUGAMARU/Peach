import React, { useState, useRef, useMemo, useCallback } from "react";
import { StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity, Button, SafeAreaView, Platform, ImageBackground } from "react-native";

import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { Header, Icon, Avatar, Badge, BottomSheet} from "react-native-elements";
import { useFonts } from "expo-font";

//デバイスの横幅、高さ、倍率
const { width, height, scale } = Dimensions.get("window");

const Main = (nav) => {
  const [profileCardSize, setProfileCardSize] = useState({"height": 0, "width": 0});
  const [BottomSheetVisible, setBottomSheetVisible] = useState(false);
  let headerMargin = 0;
  if(Platform.OS === "ios"){
    headerMargin = 20;
  }
  
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
    {id: "0", name: "おふがし", icon: require("../assets/profileIcon_6.jpg"), comment: "Just Developping the Peach app now", location: "東京都 新宿区", datetime: "19:32", cnt: "46"},
    {id: "1", name: "手塚 朱里", icon: require("../assets/profileIcon_5.jpg"), comment: "失敬失敬", location: "東京都 青梅市", datetime: "18:10", cnt: "3"},
    {id: "2", name: "天々座 理世", icon: require("../assets/profileIcon_3.jpg"), comment: "この私が断罪してくれる！", location: "東京都 清瀬市", datetime: "13:30", cnt: "130"},
    {id: "3", name: "涼風 青葉", icon: require("../assets/profileIcon_2.jpg"), comment: "今日も一日がんばるぞい！", location: "神奈川県 藤沢市", datetime: "13:20", cnt: "95"},
    {id: "4", name: "手塚 朱里", icon: require("../assets/profileIcon_5.jpg"), comment: "失敬失敬", location: "東京都 青梅市", datetime: "18:10", cnt: "3"},
    {id: "5", name: "天々座 理世", icon: require("../assets/profileIcon_3.jpg"), comment: "この私が断罪してくれる！", location: "東京都 清瀬市", datetime: "13:30", cnt: "130"},
    {id: "6", name: "涼風 青葉", icon: require("../assets/profileIcon_2.jpg"), comment: "今日も一日がんばるぞい！", location: "神奈川県 藤沢市", datetime: "13:20", cnt: "95"},
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
      <SafeAreaView style={{flex: 1, backgroundColor: "#fff"}}>
        {Platform.OS === "android" ? <Header backgroundColor="#fff"></Header> : null}
        
        <View style={{flexDirection: "row", alignItems: "center", justifyContent:"space-between", marginTop: headerMargin}}>
          <View style={{marginLeft: 10}}>
            <Text style={{fontFamily: "Arista-Pro", fontSize: 15, paddingLeft: 5, color: "#828282", position: "absolute", top: -10}}>PEACH v1.0.0</Text>
            <Text style={{fontFamily: "Kazesawa-Extrabold", fontSize: 30}}>タイムライン</Text>
          </View>
          <View style={{marginRight: 15}}>
            <TouchableOpacity onPress={() => toggleBottomSheet()}>
              <Avatar rounded source={require("../assets/profileIcon_1.jpg")} size={45} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.body}>

        <ImageBackground source={require("../assets/MainBackgroundImage.png")} resizeMode="cover" style={styles.backgroundImage}>
          <FlatList
            ListEmptyComponent={<Text>すれ違いが発生していません</Text>}
            ListFooterComponent={<>
                                  <Text>Peach is running on {Platform.OS}</Text>
                                  <Text>Height: {height} ✕ Width: {width}</Text>
                                  <Text>ProfileCardHeight: {profileCardSize.height}</Text>
                                  <Text>ProfileCardWidth: {profileCardSize.width}</Text>
                                  <Button title="Go to TopComponent" onPress={() => nav.navigation.navigate("Top")}></Button>
                                </>}
            data = {userData}
            renderItem = {({item}) => (
              <View style={styles.profileCard} onLayout={(e) => { setProfileCardSize({"height": e.nativeEvent.layout.height, "width": e.nativeEvent.layout.width}); }}>
                  <View style={styles.profileCardHeader}>
                    <View style={styles.profileCardHeaderLocation}>
                      <Icon type="font-awesome-5" name="map-marker-alt" color="#1cc95a" size={profileCardSize.height * 0.121212} containerStyle={{justifyContent: "center", alignItems: "stretch"}} />
                      <Text style={styles.profileCardHeaderLocationText}>{item.location}</Text>
                    </View>
                    <Text style={styles.dseg}>{item.datetime}</Text>
                  </View>
                <LinearGradient
                  colors={["#00FFFF", "#17C8FF", "#329BFF", "#4C64FF", "#6536FF", "#8000FF"]}
                  start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                  style={{ height: height * 0.00224}}
                />
                <View style={styles.profileCardBody}>
                    <View>
                        <Avatar rounded source={item.icon} size={width * 0.18666} />
                        <Badge value={item.cnt} containerStyle={{position: "relative", top: height * 0.015 * -1}} badgeStyle={{backgroundColor: "#ff8ab5"}} />
                    </View>
                    <View style={styles.profileCardBodyItems}>
                      <Text style={{fontFamily: "Kazesawa-Bold", fontSize: height * 0.0299, color: "#fff"}}>{item.name}</Text>
                      <Text style={{fontFamily: "Kazesawa-Regular", paddingLeft: width * 0.00533, marginBottom: height * 0.00749, color: "#fff"}}>{item.comment}</Text>
                      <View style={{flexDirection: "row", justifyContent: "flex-end", width: width * 0.66666}}>
                        <Icon name="logo-instagram" type="ionicon" color="#ce2a51" style={{paddingHorizontal: 3}} />
                        <Icon name="logo-twitter" type="ionicon" color="#1da1f2" style={{paddingHorizontal: 3}} />
                        <Icon name="logo-youtube" type="ionicon" color="#f04141" style={{paddingHorizontal: 3}} />
                      </View>
                    </View>
                </View>
              </View>
            )} 
            keyExtractor={userData => userData.id}
          />
          </ImageBackground>
          <StatusBar style="auto" />
        </View>

        <BottomSheet containerStyle={{ backgroundColor: "#fff", marginTop: 150, marginHorizontal: 15, borderRadius: 30, marginBottom: -30}} isVisible={BottomSheetVisible}>
          <View style={{backgroundColor: "#fff", marginBottom: 450}}>
            <Button title="Close" onPress={closeBottomSheet} />
            <Text>BottomSheet</Text>
          </View>
        </BottomSheet>
      
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#fff"
  },
  backgroundImage: {
    flex: 1
	},
  headerText: {
    color: "#fff",
    fontSize: height * 0.045,
    fontFamily: "Arista-Pro",
    marginTop: height * 0.015,
    marginLeft: height * 0.015,
  },
  rightComponentPosition: {
    flexDirection: "row",
    marginTop: height * 0.01,
    marginBottom: height * 0.1499 * -1,
    marginRight: width * 0.0186
  },
  profileCard: {
    backgroundColor: "#383838",
    borderRadius: 10,
    marginLeft: width * 0.04,
    marginRight: width * 0.04,
    flex: 1,
    marginTop: 20,
    /* Shadow */
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 10,
  },
  profileCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  profileCardHeaderLocation: {
    flexDirection: "row",
    paddingLeft: width * 0.0266
  },
  profileCardHeaderLocationText: {
    justifyContent: "center",
    alignItems: "stretch", 
    fontFamily: "Kazesawa-Light", 
    marginLeft: width * 0.008,
    color: "#fff"
  },
  dseg: {
    fontSize: width * 0.0333,
    padding: width * 0.008,
    paddingRight: width * 0.018666,
    color: "#fff",
    fontFamily: "DSEG7Classic-Bold",
    textAlign: "right"
  },
  profileCardBody: {
    marginTop: height * 0.007,
    paddingLeft: width * 0.0266,
    flexDirection: "row",
    backgroundColor: "#383838",
    borderRadius: 10
  },
  profileCardBodyItems: {
    marginLeft: width * 0.0266,
    paddingTop: height * 0.00449,
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