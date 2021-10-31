import React, { useState, useRef, useEffect } from "react";
import { Button, Text, SafeAreaView,TextInput, View } from "react-native";

import * as firebase from "firebase";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

import forFirebaseInitialization from "../../forFirebaseInitialization";

try{
	firebase.initializeApp(forFirebaseInitialization);
}catch(err){
	// ignore app already initialized error in snack
}

const Register = () => {
	const recaptchaVerifier = useRef(null);
	const [phoneNumber, setPhoneNumber] = useState();
	const [verificationId, setVerificationId] = useState(null);
	const [verificationCode, setVerificationCode] = useState();
	const [password, setPassword] = useState();
	const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;

	return(
		<>
			<FirebaseRecaptchaVerifierModal
				ref={recaptchaVerifier}
				firebaseConfig={firebaseConfig}
			/>
			<View style={{alignItems: "center", marginTop: 200}}>
				<Text>お電話番号</Text>
				<TextInput style={{borderWidth: 1, width: 200, height: 30}} placeholder="+81 90 XXX XXXX" keyboardType="phone-pad" textContentType="telephoneNumber"onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)} />
				<Button title="送信" onPress={async () => {
					try {
						const phoneProvider = new firebase.auth.PhoneAuthProvider();
						const verificationId = await phoneProvider.verifyPhoneNumber(phoneNumber, recaptchaVerifier.current);
						console.log("======================verificationID===================");
						console.log(verificationId);
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
						const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, verificationCode);
						await firebase.auth().signInWithCredential(credential);
						alert("✅認証が完了しました！");
						console.log(firebase.auth().currentUser);
					} catch (err) {
						alert(`😥エラーが発生しました: ${err.message}`);
				}}} />
				<Text style={{marginTop: 20}}>パスワード</Text>
				<TextInput style={{borderWidth: 1, width: 200, height: 30}} placeholder="Type password here" keyboardType="ascii-capable" onChangeText={setPassword} />
				<Button title="確定" onPress={async () => {
					const credential = firebase.auth.EmailAuthProvider.credential(phoneNumber + "@peach.firebase.google.com", password);
					console.log("==================Credential====================");
					console.log(credential);
					console.log("==================CurrentUser====================");
					console.log(firebase.auth().currentUser);
					firebase.auth().currentUser.linkWithCredential(credential)
					.then((usercred) => {
						const user = usercred.user;
						console.log("Account linking success", user);
						alert("Successfully registering your password !");
					}).catch((error) => {
						alert("Account linking error", error);
						console.log(error);
					});				  
				}} />
			</View>
		</>
	);
}

export default Register;