import React, { useState } from "react";
import { Button, Text, TextInput, View, StyleSheet, LogBox } from "react-native";

import * as firebase from "firebase";
import "firebase/firestore";

const TestFirestore = () => {
	LogBox.ignoreLogs(["Setting a timer"]);
	const db = firebase.firestore();

	const [docuemntName, setDocumentName] = useState();
	const [fieldName, setFieldName] = useState();
	const [res, setRes] = useState("There are no results");
	const [documentReadName, setDocumentReadName] = useState();

	const addToFirestore = () => {
		db.collection("test").doc(docuemntName).set({
			dataKey: fieldName
		})
		.then(() => {
			alert("Document successfully written!");
		})
		.catch((e) => {
			//console.error("Error writing document: ", e);
			alert("An error occured", e);
		});
	}

	const getFromFirestore = async () => {
		db.collection("test").doc(documentReadName).get().then((doc) => {
			if(doc.exists){
				//console.log("Document data:", doc.data());
				setRes(doc.data().dataKey);
			}else{
				// doc.data() will be undefined in this case
				alert("No such document!");
			}
		});
	}

	return(
		<View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
			<Text>Document Name(Write)</Text>
			<TextInput placeholder="Like UserID" onChangeText={(txt) => setDocumentName(txt)} style={styles.txtInput}></TextInput>
			<Text>Field Name</Text>
			<TextInput placeholder="Something" onChangeText={(txt) => setFieldName(txt)} style={styles.txtInput}></TextInput>
			<Button title="Add" onPress={addToFirestore}/>
			<Text>Document Name(Read)</Text>
			<TextInput placeholder="Like UserID" onChangeText={(txt) => setDocumentReadName(txt)} style={styles.txtInput}></TextInput>
			<Button title="Get" onPress={getFromFirestore} />
			<Text>↓Result↓</Text>
			<Text>{res}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	txtInput: {
		borderWidth: 1,
		padding: 1,
		width: 200,
		textAlign: "center",
		marginVertical: 10
	}
});

export default TestFirestore;