import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Text } from "react-native";
import Dialog, { SlideAnimation, DialogContent, DialogTitle, DialogFooter, DialogButton } from "react-native-popup-dialog";

/*
props
prop: example
titleBackgroundColor: "#f35469"
title: "エラー"
body: "エラーが発生しました"
*/
const Dialogue = forwardRef((props, ref) => {
	const [showDialog, setShowDialog] = useState(false);

	useImperativeHandle(ref, () => ({
		openDialog() {
			setShowDialog(true);
		}
	}),
	)
	return(
		<Dialog visible={showDialog} dialogTitle={<DialogTitle title={props.title} textStyle={{fontFamily: "Kazesawa-Bold", color: "#fff"}} style={{backgroundColor: props.titleBackgroundColor}} />} width={300}
			dialogAnimation={new SlideAnimation({
				slideFrom: "bottom",
			})}
			onTouchOutside={() => {
				setShowDialog(false);
			}}
			footer={
				<DialogFooter style={{backgroundColor: "#383838"}}>
					<DialogButton text="OK" onPress={() => {setShowDialog(false)}} textStyle={{color: "#ff8ab5"}} activeOpacity={1} />
				</DialogFooter>
			}
  		>
			<DialogContent style={{backgroundColor: "#383838"}}>
				<Text style={{marginTop: 20, fontFamily: "Kazesawa-Regular", color: "#fff", textAlign: "center"}}>{props.body}</Text>
			</DialogContent>
		</Dialog>
	);
});

export default Dialogue