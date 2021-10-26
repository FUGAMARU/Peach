import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions, ScrollView, FlatList, Image, ImageBackground } from "react-native";
import { StatusBar } from "expo-status-bar";

import { useFonts } from "expo-font";
import { Button } from "react-native-elements";
//import { SvgXml, SvgUri } from "react-native-svg";

const Top = () => {
	let [fontsLoaded] = useFonts({
		"Arista-Pro": require("../assets/fonts/aristapro-fat.otf"),
		"Kazesawa-Bold": require("../assets/fonts/Kazesawa-Bold.ttf"),
		"Kazesawa-Extrabold": require("../assets/fonts/Kazesawa-Extrabold.ttf"),
		"Kazesawa-Light": require("../assets/fonts/Kazesawa-Light.ttf"),
		"Kazesawa-Regular": require("../assets/fonts/Kazesawa-Regular.ttf"),
	});

	if(!fontsLoaded){
		return null;
	}else{
		return(
			<>	
			<View style={styles.container}>
				<ImageBackground source={require("../assets/LoginBackgroundImage.jpg")} resizeMode="cover" style={styles.backgroundImage}>
					<View style={{borderWidth: 2, alignItems: "center", justifyContent: "center", padding: 40, borderColor: "#fff"}}>
						<Text style={{fontFamily: "Arista-Pro", color: "#fff", fontSize: 50}}>PEACH</Text>
						<View>
							<Button title={<Text style={{fontFamily: "Kazesawa-Bold", fontSize: 15, color: "#ff8ab5"}}>はじめる</Text>} buttonStyle={{backgroundColor: "#fff", width: 200, borderRadius: 20, marginTop: 30}} />
							<Button type="outline" title={<Text style={{fontFamily: "Kazesawa-Bold", fontSize: 15, color: "#fff"}}>ログイン</Text>} buttonStyle={{width: 200, borderRadius: 20, marginVertical: 20, borderColor: "#fff", borderWidth: 2}} />
						</View>
					</View>
					<StatusBar style="auto" />
				</ImageBackground>
				</View>
			</>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#ff8ab5",
		alignItems: 'center',
		justifyContent: 'center'
	},
	backgroundImage: {
		flex: 1,
		width: "100%",
		alignItems: "center",
   		justifyContent: "center"
	}
});

export default Top;