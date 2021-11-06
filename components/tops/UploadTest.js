import React, { useState, useRef, useEffect } from "react";
import { Button, Text, SafeAreaView,TextInput, View, Image, LogBox } from "react-native";

import * as ImagePicker from 'expo-image-picker';

import * as firebase from "firebase";

const UploadTest = () => {
	LogBox.ignoreLogs(["Setting a timer"]);

	const [imageURI, setImageURI] = useState(null);
	const [info, setInfo] = useState("");
	const [progress, setProgress] = useState("");
	const [filename, setFilename] = useState("");

	useEffect(() => {
		(async () => {
			const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
			if (status !== 'granted') {
			  alert('Sorry, we need camera roll permissions to make this work!');
			}
		})();
	  }, []);
	
	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		console.log(result);
		if (!result.cancelled) {
			setImageURI(result.uri);
			setInfo(result.uri);
		}
	}

	const uploadPicture = async () => {
		const localUri = await fetch(info);
		const localBlob = await localUri.blob();

		const storageRef = firebase.storage().ref().child("images/" + filename);

		const putTask = storageRef.put(localBlob);
		putTask.on('state_changed', (snapshot) => {
			let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			setProgress(parseInt(progress));
		}, (error) => {
			console.log(error);
			alert("アップロードに失敗しました。ログインしていますか？");
		}, () => {
			putTask.snapshot.ref.getDownloadURL().then(downloadURL => {
				console.log("==================Download URL====================");
				console.log(downloadURL);
				alert(`Upload Complete!\n${downloadURL}`);
			})
		})
	}
	

	return(
		<View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
			<Text>UploadTest</Text>
			<Button title="Pickup Picture" onPress={pickImage} />
			{imageURI && <Image source={{uri: imageURI}} style={{width: 250, height: 250}} />}
			<Text>↓Information↓</Text>
			<Text>{info}</Text>
			<Text>Filename</Text>
			<TextInput placeholder="filename.jpg" style={{borderWidth: 1, width: 250}} onChangeText={(text) => setFilename(text)} />
			<Button title="Upload Picture" onPress={uploadPicture} />
			<Text>{progress}% Uploaded</Text>
		</View>
	);
}

export default UploadTest;