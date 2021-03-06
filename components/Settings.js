import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";

const Settings = () => {
	return(
		<View style={styles.container}>
      		<Text>This is a Settings Component</Text>
      		<StatusBar style="auto" />
    	</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default Settings;