import React, { useState, useRef } from "react";
import { Button, Text, SafeAreaView,TextInput, View } from "react-native";

import * as firebase from "firebase";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

import forFirebaseInitialization from "../forFirebaseInitialization";

try{
	firebase.initializeApp(forFirebaseInitialization);
}catch(err){
	// ignore app already initialized error in snack
}

const Register = () => {
	const recaptchaVerifier = useRef(null);
	const [phoneNumber, setPhoneNumber] = useState();
	const [verificationId, setVerificationId] = useState();
	const [verificationCode, setVerificationCode] = useState();
	const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;

	return(
		<>
			<FirebaseRecaptchaVerifierModal
				ref={recaptchaVerifier}
				firebaseConfig={firebaseConfig}
			/>
			<View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
				<Text>お電話番号</Text>
				<TextInput style={{borderWidth: 1, width: 200, height: 30}} placeholder="+81 90 XXX XXXX" keyboardType="phone-pad" textContentType="telephoneNumber"onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)} />
				<Button title="送信" onPress={async () => {
					try {
						const phoneProvider = new firebase.auth.PhoneAuthProvider();
						const verificationId = await phoneProvider.verifyPhoneNumber(
						phoneNumber,
						recaptchaVerifier.current
						);
						setVerificationId(verificationId);
						alert("👻認証コードを送信しました");
					} catch (err) {
						alert(`😥エラーが発生しました: ${err.message}`);
					}
				}}/>
				<Text style={{marginTop: 20}}>認証コード</Text>
				<TextInput style={{borderWidth: 1, width: 200, height: 30}} placeholder="123456" keyboardType="number-pad" onChangeText={setVerificationCode} />
				<Button title="認証" onPress={async () => {
					try {
						const credential = firebase.auth.PhoneAuthProvider.credential(
						verificationId,
						verificationCode
						);
						await firebase.auth.signInWithCredential(credential);
						alert("✅認証が完了しました！");
					} catch (err) {
						alert(`😥エラーが発生しました: ${err.message}`);
				}}} />
			</View>
		</>
	);
}

export default Register;