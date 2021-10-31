import React from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import { Button } from "react-native-elements";

const { width, height, scale } = Dimensions.get("window");

const TopMenu = (props) => {
	return(
		<View style={styles.animatedChildContainer}>
			<Image source={require("../../assets/tmpBrandIconPC.png")} style={{height: height * 0.148, width: height * 0.148}}></Image>
			<Text style={styles.peachText}>PEACH</Text>
			<Text style={styles.bottomText}>Peeking each other's profiles</Text>
			<View>
				<View style={styles.getStartedButtonContainer}><Button title={<Text style={styles.getStartedButtonText}>はじめる</Text>} buttonStyle={styles.getStartedButton} onPress={() => props.childrenButtonOnPress("getStarted")} /></View>
				<View style={styles.loginButtonContainer}><Button type="outline" title={<Text style={styles.loginButtonText}>ログイン</Text>} buttonStyle={styles.loginButton} onPress={() => props.childrenButtonOnPress("login")} /></View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	animatedChildContainer: {
		width: width * 0.88,
		height: height * 0.65,
		overflow: "hidden",
		borderRadius: 20,
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

export default TopMenu;
