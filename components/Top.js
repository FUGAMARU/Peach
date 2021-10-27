import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions, ScrollView, FlatList, Image, ImageBackground } from "react-native";
import { StatusBar } from "expo-status-bar";

import { useFonts } from "expo-font";
import { Button } from "react-native-elements";
import { BlurView } from "expo-blur";
//import { SvgXml, SvgUri } from "react-native-svg";

const { width, height, scale } = Dimensions.get("window");

const Top = () => {
	let [fontsLoaded] = useFonts({
		"Arista-Pro": require("../assets/fonts/aristapro-fat.otf"),
		"Kazesawa-Bold": require("../assets/fonts/Kazesawa-Bold.ttf"),
		"Kazesawa-Extrabold": require("../assets/fonts/Kazesawa-Extrabold.ttf"),
		"Kazesawa-Light": require("../assets/fonts/Kazesawa-Light.ttf"),
		"Kazesawa-Regular": require("../assets/fonts/Kazesawa-Regular.ttf"),
		"OCRAEXT": require("../assets/fonts/OCRAEXT.ttf"),
	});

	if(!fontsLoaded){
		return null;
	}else{
		return(
			<>	
				<View style={styles.container}>
					<ImageBackground source={require("../assets/TopBackgroundImage.jpg")} resizeMode="cover" style={styles.backgroundImage}>
						<View style={styles.viewContainer}>
							<Image source={require("../assets/tmpBrandIconPC.png")} style={{height: 100, width: 100}}></Image>
							<Text style={styles.peachText}>PEACH</Text>
							<Text style={styles.bottomText}>Peeking each other's profiles</Text>
							<View>
								<View style={styles.getStartedButtonContainer}><Button title={<Text style={styles.getStartedButtonText}>はじめる</Text>} buttonStyle={styles.getStartedButton} /></View>
								<View style={styles.loginButtonContainer}><Button type="outline" title={<Text style={styles.loginButtonText}>ログイン</Text>} buttonStyle={styles.loginButton} /></View>
							</View>
						</View>
					</ImageBackground>
					<StatusBar style="auto" />
				</View>
			</>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#ff8ab5",
		alignItems: "center",
		justifyContent: "center"
	},
	backgroundImage: {
		flex: 1,
		width: "100%",
		alignItems: "center",
   		justifyContent: "center"
	},
	viewContainer: {
		overflow: "hidden",
		borderRadius: 20,
		backgroundColor: "#fff",
		padding: width * 0.10666,
		alignItems: "center",
		justifyContent: "center"
	},
	peachText: {
		fontFamily: "Arista-Pro",
		color: "#ff8ab5",
		fontSize: height * 0.07496
	},
	bottomText: {
		fontFamily: "OCRAEXT",
		color: "#1cc95a"
	},
	getStartedButtonContainer: {
		marginTop: height * 0.05997,
		borderRadius: 30,
		/* Shadow */
		shadowColor: "#000",
		shadowOffset: {
		  width: 0,
		  height: 2,
		},
		shadowOpacity: 0.3,
		shadowRadius: 5,
		elevation: 5
	},
	getStartedButton: {
		backgroundColor: "#ff8ab5",
		width: width * 0.53333,
		borderRadius: 30,
		height: height * 0.0899
	},
	getStartedButtonText: {
		fontFamily: "Kazesawa-Bold", 
		fontSize: height * 0.02998,
		color: "#fff",
	},
	loginButtonContainer: {
		marginTop: height * 0.02998
	},
	loginButton: {
		width: width * 0.53333,
		borderRadius: 30,
		borderColor: "#ff8ab5",
		borderWidth: 2,
		height: height * 0.0899
	},
	loginButtonText: {
		fontFamily: "Kazesawa-Bold",
		fontSize: height * 0.02998,
		color: "#ff8ab5"
	}
});

export default Top;