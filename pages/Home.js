import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import BtnContainer from "../components/Home/BtnContainer";


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

  render() {
    return (
      <View style={styles.mainView}>
        <Text style={styles.text}>Presioname si estas en peligro</Text>
        <BtnContainer/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    padding: 20
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 30,
    fontWeight: 'bold'
  },
});
