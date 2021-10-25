import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions, ScrollView, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";

const Login = () => {
	return(
		<View style={styles.container}>
      		<Text>This is a Login Component</Text>
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

export default Login;