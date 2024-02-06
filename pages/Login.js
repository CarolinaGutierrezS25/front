import React, { Component } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import LoginForm from "../components/Login/LoginForm.js";
import colors from "../components/assets/colors.js";
import AuthProvider from '../helpers/AuthProvider.js';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
            <LoginForm/>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
});
