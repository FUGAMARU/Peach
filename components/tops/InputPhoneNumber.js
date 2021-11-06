import React, { useState, useRef } from "react";
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Animated, Image, LogBox } from "react-native";
import { Icon } from "react-native-elements";
import { TextInput } from "react-native-paper";
import * as firebase from "firebase";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

import Dialogue from "../Dialogue";

const { width, height, scale } = Dimensions.get("window");

let phoneNumber1, phoneNumber2, phoneNumber3;

const InputPhoneNumber = (props) => {
	LogBox.ignoreLogs(["Failed prop type", "componentWillReceiveProps"]);
	const fadeAnim = useRef(new Animated.Value(1)).current;
	const recaptchaVerifier = useRef(null);
	const [verificationId, setVerificationId] = useState(null);
	const [verificationCode, setVerificationCode] = useState();
	const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;

	const DialogueRef = useRef();
	const [dialogTitleBackgroundColor, setdialogTitleBackgroundColor] = useState();
	const [dialogTitle, setDialogTitle] = useState();
	const [dialogBody, setDialogBody] = useState();

	const phoneNumberRef2 = useRef(null);
	const phoneNumberRef3 = useRef(null);

	const autoFocus = (id, text) => {
		switch(id){
			case 1:
				phoneNumber1 = text;
				if(text.length === 3){
					phoneNumberRef2.current.focus();
				}
				break;
			case 2:
				phoneNumber2 = text;
				if(text.length === 4){
					phoneNumberRef3.current.focus();
				}
				break;
			case 3:
				phoneNumber3 = text;
				break;
		}
	}

	const sendVerificationCode = async () => {
		const regex = new RegExp(/^0[789]0[0-9]{4}[0-9]{4}$/);
		let phoneNumber = phoneNumber1 + phoneNumber2 + phoneNumber3;
		if(regex.test(phoneNumber)){
			Animated.timing(
				fadeAnim,
				{
				  toValue: 0,
				  duration: 250,
				  useNativeDriver: true
				}
			).start(() => {
				setFooterComponent(<Image source={require("../../assets/loadingWalker.gif")} style={styles.loadingWalker} />);
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
				props.setStateFromIPN("phoneNumber", phoneNumber);
				phoneNumber = "+81" + phoneNumber.slice(1);
				const phoneProvider = new firebase.auth.PhoneAuthProvider();
				const verificationId = await phoneProvider.verifyPhoneNumber(phoneNumber, recaptchaVerifier.current);
				//const verificationId = "TestID";
				console.log("======================verificationID===================");
				console.log(verificationId);
				props.setStateFromIPN("verificationId", verificationId);
				props.childrenButtonOnPress("sendVerificationCode");
				//setVerificationId(verificationId);
				//alert("👻認証コードを送信しました");
			} catch (err) {
				setdialogTitleBackgroundColor("#f35469");
				setDialogTitle("エラー");
				setDialogBody("エラーが発生しました(コード: 1)");
				DialogueRef.current.openDialog();
			}
		}else{
			setdialogTitleBackgroundColor("#f35469");
			setDialogTitle("エラー");
			setDialogBody("入力された電話番号のフォーマットが不正です");
			DialogueRef.current.openDialog();
		}
	}

	const [footerComponent, setFooterComponent] = useState(
		<TouchableOpacity onPress={sendVerificationCode}>
			<Icon name="chevron-forward-circle-outline" type="ionicon" color="#ff8ab5" size={height * 0.12} />
		</TouchableOpacity>
	);

	return(
		<>
			<FirebaseRecaptchaVerifierModal ref={recaptchaVerifier}	firebaseConfig={firebaseConfig}	title="reCAPTCHA認証" cancelLabel="キャンセル" />
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
				<Animated.View	style={{opacity: fadeAnim, height: height * 0.135, marginTop: height * 0.045}}>	
					{footerComponent}
				</Animated.View>
			</View>
			<Dialogue ref={DialogueRef} titleBackgroundColor={dialogTitleBackgroundColor} title={dialogTitle} body={dialogBody} />
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
	},
	loadingWalker: {
		height: height * 0.0974,
		width: width * 0.17333,
		marginTop: height * 0.018
	}
});

export default InputPhoneNumber;