import React, { useState, useRef } from "react";
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { TextInput } from "react-native-paper";

import * as firebase from "firebase";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

import forFirebaseInitialization from "../../forFirebaseInitialization";

try{
	firebase.initializeApp(forFirebaseInitialization);
}catch(err){
	// ignore app already initialized error in snack
}

const { width, height, scale } = Dimensions.get("window");

const InputPhoneNumber = (props) => {

	const recaptchaVerifier = useRef(null);
	const [phoneNumber, setPhoneNumber] = useState();
	const [verificationId, setVerificationId] = useState(null);
	const [verificationCode, setVerificationCode] = useState();
	const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;

	const [phoneNumber1, setPhoneNumber1] = useState();
	const [phoneNumber2, setPhoneNumber2] = useState();
	const [phoneNumber3, setPhoneNumber3] = useState();
	const phoneNumberRef2 = useRef(null);
	const phoneNumberRef3 = useRef(null);

	const autoFocus = (id, text) => {
		switch(id){
			case 1:
				setPhoneNumber1(text);
				if(text.length === 3){
					phoneNumberRef2.current.focus();
				}
				break;
			case 2:
				setPhoneNumber2(text);
				if(text.length === 4){
					phoneNumberRef3.current.focus();
				}
				break;
			case 3:
				setPhoneNumber3(text);
				break;
		}
	}

	const sendVerificationCode = async () => {
		alert("Your phone number is " + phoneNumber1 + "-" + phoneNumber2 + "-" + phoneNumber3);
	}

	return(
		<>
			<FirebaseRecaptchaVerifierModal
				ref={recaptchaVerifier}
				firebaseConfig={firebaseConfig}
			/>
			<View style={styles.container}>
				<Icon name="paper-plane" type="font-awesome-5" color="#ff8ab5" size={height * 0.09} />
				<Text style={styles.titleText}>SMS認証</Text>
				<Text style={styles.instructionText}>電話番号を入力してください</Text>
				<View style={{flexDirection: "row", alignItems:"center"}}>
					<TextInput style={styles.phoneNumberTextInput3} name="1" keyboardType="number-pad" returnKeyType="done" maxLength={3} placeholder="090" onChangeText={(text) => autoFocus(1, text)} underlineColor="#ff8ab5" selectionColor="#ff8ab5" theme={phoneNumberTextInputTheme} />
					<Text style={styles.hyphen}>-</Text>
					<TextInput style={styles.phoneNumberTextInput4} name="2" keyboardType="number-pad" returnKeyType="done" maxLength={4} placeholder="1234" ref={phoneNumberRef2} onChangeText={(text) => autoFocus(2, text)} underlineColor="#ff8ab5" selectionColor="#ff8ab5" theme={phoneNumberTextInputTheme} />
					<Text style={styles.hyphen}>-</Text>
					<TextInput style={styles.phoneNumberTextInput4} name="3" keyboardType="number-pad" returnKeyType="done" maxLength={4} placeholder="5678" ref={phoneNumberRef3} onChangeText={(text) => autoFocus(3, text)} underlineColor="#ff8ab5" selectionColor="#ff8ab5" theme={phoneNumberTextInputTheme} />
				</View>
				<TouchableOpacity onPress={sendVerificationCode} >
					<Icon name="chevron-forward-circle-outline" type="ionicon" color="#ff8ab5" size={height * 0.12} style={{marginTop: height * 0.075}} />
				</TouchableOpacity>
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
	hyphen: {
		fontSize: height * 0.0524,
		color: "#525252"
	},
	phoneNumberTextInput3: {
		height: height * 0.06,
		width: width * 0.213,
		fontSize: height * 0.0374,
		textAlign: "center",
		fontWeight: "bold",
	},
	phoneNumberTextInput4: {
		height: height * 0.06,
		width: width * 0.25333,
		fontSize: height * 0.0374,
		textAlign: "center",
		fontWeight: "bold"
	}
});

export default InputPhoneNumber;