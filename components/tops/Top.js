import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Dimensions, ImageBackground, Animated, Keyboard, TouchableWithoutFeedback } from "react-native";
import { StatusBar } from "expo-status-bar";

//import { SvgXml, SvgUri } from "react-native-svg";

import TopMenu from "./TopMenu";
import InputPhoneNumber from "./InputPhoneNumber";
import VerificationCode from "./VerificationCode";

const { width, height, scale } = Dimensions.get("window");

const Top = (nav) => {
	const fadeAnim = useRef(new Animated.Value(0)).current;
	const [currentComponent, setCurrentComponent] = useState("TopMenu");

	const [phoneNumber, setPhoneNumber] = useState();
	const [verificationId, setVerificationId] = useState();

	useEffect(() => {
		Animated.timing(
			fadeAnim,
			{
				toValue: 1,
				duration: 1500,
				useNativeDriver: true
			}
		).start();
	}, []);

	const changeComponent = (nextComponent) => {
		Animated.timing(
			fadeAnim,
			{
			  toValue: 0,
			  duration: 500,
			  useNativeDriver: true
			}
		  ).start(() => {
			  //フェードアウトが完了したら
			setCurrentComponent(nextComponent);
			Animated.timing(
			fadeAnim,
			{
				toValue: 1,
				duration: 500,
				useNativeDriver: true
			}
			).start();
		  });
	}

	const childrenButtonOnPress = (id) => {
		switch(id){
			case "getStarted":
				changeComponent("InputPhoneNumber");
				break;
			case "sendVerificationCode":
				changeComponent("VerificationCode");
				break;
		}
	}

	const setStateFromIPN = (state, data) =>{
		switch(state){
			case "phoneNumber":
				setPhoneNumber(data);
				//「07011112222」の形式
				break;
			case "verificationId":
				setVerificationId(data);
				break;
		}
	}

	return(
		<>	
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
				<View style={styles.container}>
					<ImageBackground source={require("../../assets/TopBackgroundImage.jpg")} resizeMode="cover" style={styles.backgroundImage}>
						<View style={styles.backgroundContainerView}>
							<Animated.View	style={{opacity: fadeAnim}}>
								{currentComponent === "TopMenu" ? <TopMenu childrenButtonOnPress={childrenButtonOnPress} /> : false}
								{currentComponent === "InputPhoneNumber" ? <InputPhoneNumber childrenButtonOnPress={childrenButtonOnPress} setStateFromIPN={setStateFromIPN} /> : false}
								{currentComponent === "VerificationCode" ? <VerificationCode childrenButtonOnPress={childrenButtonOnPress} verificationId={verificationId} /> : false}
							</Animated.View>
						</View>
					</ImageBackground>
					<StatusBar style="auto" />
				</View>
			</TouchableWithoutFeedback>
		</>
	);
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
	backgroundContainerView: {
		width: width * 0.88,
		height: height * 0.65,
		overflow: "hidden",
		borderRadius: 20,
		backgroundColor: "#fff",
	}
});

export default Top;