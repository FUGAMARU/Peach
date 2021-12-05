import React, { useState, useRef, useEffect } from "react";
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Animated, Image, Alert } from "react-native";
import { Icon } from "react-native-elements";
import { TextInput } from "react-native-paper";

import * as firebase from "firebase";

const { width, height, scale } = Dimensions.get("window");
let verificationCode;
let countdownTimer;
let subTimer = 30;

const VerificationCode = (props) => {
	const fadeAnim = useRef(new Animated.Value(1)).current;
	const fadeAnim2 = useRef(new Animated.Value(1)).current;

	const [showTimer, setShowTimer] = useState(true);
	const [timer, setTimer] = useState(30);

	useEffect(() => {
		subTimer = 30;
		countDown30Seconds();

		return () => clearInterval(countdownTimer);
	}, []);

	const walkerToArrow = () => {
		Animated.timing(
			fadeAnim,
			{
			  toValue: 0,
			  duration: 250,
			  useNativeDriver: true
			}
		).start(() => {
			setRightFooterComponent(defaultRightFooterComponent);
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

	const timerToArrow = () => {
		Animated.timing(
			fadeAnim2,
			{
			  toValue: 0,
			  duration: 250,
			  useNativeDriver: true
			}
		).start(() => {
			setShowTimer(false);
			Animated.timing(
			fadeAnim2,
			{
				toValue: 1,
				duration: 500,
				useNativeDriver: true
			}
			).start();
		});
	}

	const setVerificationCode = (text) => {
		verificationCode = text;
	}

	const countDown30Seconds = () => {
		countdownTimer = setInterval(() => {
			setTimer((prevTimer) => prevTimer - 1);
			subTimer--;
			if(subTimer === 0){
				timerToArrow();
			}else if(subTimer < 0){
				clearInterval(countdownTimer);
			}
		}, 1000);
	}

	const backToIPN = () => {
		if(subTimer < 0){
			props.childrenButtonOnPress("backToIPN");
		}
	}

	const toVerificateCode = async () => {
		Animated.timing(
			fadeAnim,
			{
			  toValue: 0,
			  duration: 250,
			  useNativeDriver: true
			}
		).start(() => {
			setRightFooterComponent(<Image source={require("../../assets/loadingWalker.gif")} style={styles.loadingWalker} />);
			Animated.timing(
			fadeAnim,
			{
				toValue: 1,
				duration: 500,
				useNativeDriver: true
			}
			).start();
		});
		try {
			const credential = firebase.auth.PhoneAuthProvider.credential(props.verificationId, verificationCode);
			await firebase.auth().signInWithCredential(credential);
			//alert("✅認証が完了しました！");
			console.log(firebase.auth().currentUser);
			props.childrenButtonOnPress("completeVerification");
		} catch (err) {
			Alert.alert("エラー", "SMS認証に失敗しました\n受信した確認コードと入力したコードは一致していますか？",
				[{ text: "OK", onPress: () => walkerToArrow()}]
			);
		}
	}

	const defaultRightFooterComponent = <TouchableOpacity onPress={toVerificateCode}>
										<Icon name="chevron-forward-circle-outline" type="ionicon" color="#ff8ab5" size={height * 0.12} />
									</TouchableOpacity>;
	const [rightFooterComponent, setRightFooterComponent] = useState(defaultRightFooterComponent);

	return (
		<>
			<View style={styles.container}>
				<Icon name="how-to-reg" type="material" color="#ff8ab5" size={height * 0.12} />
				<Text style={styles.titleText}>SMS認証</Text>
				<Text style={styles.instructionText}>受信した確認コードを入力してください</Text>
				<View style={{flexDirection: "row", alignItems:"center"}}>
					<TextInput style={styles.verificationCode} keyboardType="number-pad" returnKeyType="done" maxLength={6} placeholder="123456" onChangeText={(text) => setVerificationCode(text)} underlineColor="#ff8ab5" selectionColor="#ff8ab5" theme={phoneNumberTextInputTheme} />
				</View>
				<View style={styles.footerButtonContainer}>
					<Animated.View	style={{opacity: fadeAnim2}}>
						{showTimer ? <View style={styles.countdownCircle}><Text style={styles.countdownCircleText}>{timer}</Text></View> : <TouchableOpacity onPress={backToIPN}><Icon name="chevron-back-circle-outline" type="ionicon" color="#ff8ab5" size={height * 0.12} /></TouchableOpacity>}
					</Animated.View>
					<Animated.View	style={{opacity: fadeAnim}}>	
						{rightFooterComponent}
					</Animated.View>
				</View>
			</View>
		</>
	);
}

const phoneNumberTextInputTheme = {
	colors: {primary: "#ff8ab5",
			placeholder: "#bfbdbd",
			background: "transparent",
			text: "#525252",
			}
}

const styles = StyleSheet.create({
	container: {
		width: width * 0.88,
		height: height * 0.65,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	titleText: {
		marginBottom: height * 0.045,
		fontFamily: "Kazesawa-Bold",
		fontSize: height * 0.0524,
		color: "#ff8ab5"
	},
	instructionText:{
		fontFamily: "Kazesawa-Regular",
		color: "#383838",
		fontSize: height * 0.018
	},
	verificationCode: {
		height: height * 0.06,
		width: width * 0.32,
		fontSize: height * 0.0374,
		textAlign: "center",
		fontWeight: "bold",
	},
	loadingWalker: {
		height: height * 0.0974,
		width: width * 0.17333,
		marginTop: height * 0.018
	},
	footerButtonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		height: height * 0.135,
		marginTop: height * 0.045,
		paddingLeft: width * 0.02666,
		width: width * 0.613333
	},
	countdownCircle: {
		width: width * 0.17333,
		height: height * 0.0974,
		borderRadius: 50,
		borderWidth: 5,
		borderColor: "#ff8ab5",
		justifyContent: "center",
		marginTop: height * 0.015
	},
	countdownCircleText: {
		fontSize: height * 0.0374,
		textAlign: "center",
		color: "#ff8ab5",
		fontWeight: "bold"
	}
});

export default VerificationCode;
