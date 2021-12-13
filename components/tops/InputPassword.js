import React, { useState, useRef, useEffect } from "react";
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Animated, Image, LogBox, Alert } from "react-native";
import { Icon } from "react-native-elements";
import { TextInput } from "react-native-paper";
import * as firebase from "firebase";

const { width, height, scale } = Dimensions.get("window");

const InputPassword = (props) => {
	LogBox.ignoreLogs(["Failed prop type", "componentWillReceiveProps"]);
	const fadeAnim = useRef(new Animated.Value(1)).current;

	const [password1, setPassword1] = useState();
	const [password2, setPassword2] = useState();
	const [isPasswordVisible, setPasswordVisible] = useState(false);
	const [checkboxIcon, setCheckboxIcon] = useState("square-outline");

	const passwordRef1 = useRef(null);
	const passwordRef2 = useRef(null);

	useEffect(() => {
		if(isPasswordVisible){
			setCheckboxIcon("checkbox-outline");
		}else{
			setCheckboxIcon("square-outline");
		}
	}, [isPasswordVisible]);

	const registerPassword = async () => {
		const pass1 = passwordRef1.current.props.defaultValue;
		const pass2 = passwordRef2.current.props.defaultValue;
		if(pass1 == pass2){
			const match1 = pass1.match(/[0-9]/);
			const match2 = pass1.match(/[a-zA-Z]/);
			if(match1 && match2 && pass1.length >= 8){
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
					const credential = firebase.auth.EmailAuthProvider.credential(props.phoneNumber + "@peach.firebase.google.com", pass1);
					firebase.auth().currentUser.linkWithCredential(credential)
					.then((usercred) => {
						const user = usercred.user;
						console.log("Account linking success", user);
						alert("パスワードの登録が完了しました!");
						//const uid = user.uid; 
					}).catch((error) => {
						Alert.alert("エラー", `エラーが発生しました\n${error}`);
					});
					//props.childrenButtonOnPress("registerPassword");
				} catch (err) {
					Alert.alert("エラー", "エラーが発生しました(コード: 2)");
				}
			}else{
				Alert.alert("エラー", "パスワードのフォーマットが不正です\n8文字以上で英数字が混在しているパスワードを入力してください");
			}
		}else{
			Alert.alert("エラー", "入力された2つのパスワードが一致していません");
		}
	}

	const [footerComponent, setFooterComponent] = useState(
		<TouchableOpacity onPress={registerPassword}>
			<Icon name="chevron-forward-circle-outline" type="ionicon" color="#ff8ab5" size={height * 0.12} />
		</TouchableOpacity>
	);

	return(
		<>
			<View style={styles.container}>
				<Icon name="key-outline" type="ionicon" color="#ff8ab5" size={height * 0.09} />
				<Text style={styles.titleText}>パスワード登録</Text>
				<Text style={styles.instructionText}>8文字以上で</Text>
				<Text style={styles.instructionText}>英数字が混在しているパスワードを登録してください</Text>
				<TextInput style={styles.password} secureTextEntry={!isPasswordVisible} keyboardType="numbers-and-punctuation" placeholder="パスワードを入力" onChangeText={(text) => setPassword1(text)} defaultValue={password1} underlineColor="#ff8ab5" selectionColor="#ff8ab5" theme={TextInputTheme} ref={passwordRef1} />
				<TextInput style={styles.password} secureTextEntry={!isPasswordVisible} keyboardType="numbers-and-punctuation" placeholder="パスワードを再入力" onChangeText={(text) => setPassword2(text)} defaultValue={password2} underlineColor="#ff8ab5" selectionColor="#ff8ab5" theme={TextInputTheme} ref={passwordRef2} />
				<View style={{flexDirection: "row", alignItems: "center"}}>
					<Icon name={checkboxIcon} type="ionicon" color="#ff8ab5" size={height * 0.045} onPress={() => {setPasswordVisible(!isPasswordVisible)}}/>
					<Text style={{fontFamily: "Kazesawa-Bold", color: "#383838"}}>パスワードを表示する</Text>
				</View>
				<Animated.View	style={{opacity: fadeAnim, height: height * 0.135, marginTop: height * 0.015}}>	
					{footerComponent}
				</Animated.View>
			</View>
		</>
	);
}

const TextInputTheme = {
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
		marginBottom: height * 0.015,
		fontFamily: "Kazesawa-Bold",
		fontSize: height * 0.0524,
		color: "#ff8ab5"
	},
	instructionText:{
		fontFamily: "Kazesawa-Regular",
		color: "#383838",
		fontSize: height * 0.018
	},
	password: {
		height: height * 0.06,
		width: width * 0.5333,
		fontSize: height * 0.0225,
		textAlign: "center",
		fontWeight: "bold",
		marginBottom: height * 0.0075
	},
	loadingWalker: {
		height: height * 0.0974,
		width: width * 0.17333,
		marginTop: height * 0.018
	}
});

export default InputPassword;