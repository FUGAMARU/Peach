import { StatusBar } from "expo-status-bar";
import React, { useState, useRef, useEffect } from "react";
import { Button, Text, SafeAreaView, TextInput, View, Dimensions, StyleSheet } from "react-native";

import * as firebase from "firebase";

const { width, height, scale } = Dimensions.get("window");

const VerificationCode = (props) => {
  const [verificationCode, setVerificationCode] = useState();

  return (
    <View style={styles.container}>
      <Text style={{marginBottom: 10}}>認証コード</Text>
			<TextInput style={{borderWidth: 1, width: 200, height: 30}} placeholder="123456" keyboardType="number-pad" onChangeText={setVerificationCode} />
      <Button title="認証" onPress={async () => {
					try {
						const credential = firebase.auth.PhoneAuthProvider.credential(props.verificationId, verificationCode);
						await firebase.auth().signInWithCredential(credential);
						alert("✅認証が完了しました！");
						console.log(firebase.auth().currentUser);
					} catch (err) {
						alert(`😥エラーが発生しました: ${err.message}`);
				}}} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width * 0.88,
		height: height * 0.65,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
  },
});

export default VerificationCode;
