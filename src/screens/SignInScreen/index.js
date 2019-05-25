import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import firebase from "react-native-firebase";
import { Button, withColors } from "ReactNativeNotas/src/components";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 30
  },
  inputs: {
    justifyContent: "center",
    alignItems: "center",
    width: "70%"
  },
  input: {
    width: "100%",
    borderWidth: 1,
    padding: 10,
    margin: 10,
    borderRadius: 5
  },
  buttons: {
    flexDirection: "row",
    margin: 30
  },
  button: {
    width: 150,
    margin: 5
  }
});

class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      passwordConfirm: null,
      signup: false
    };
  }

  loginAction = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate("Main"))
      .catch(error => this.setState({ errorMessage: error.message }));
  };

  signupAction = () => {
    const { email, password, passwordConfirm } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate("App"))
      .catch(error => this.setState({ errorMessage: error.message }));
  };

  toggleSignupLogin = () => {
    this.setState({ signup: !this.state.signup });
  };

  render() {
    const { colors } = this.props;
    const {
      email,
      password,
      passwordConfirm,
      errorMessage,
      signup
    } = this.state;
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={styles.title}>ReactNative Notes</Text>
        <View style={styles.inputs}>
          <TextInput
            style={styles.input}
            value={email}
            placeholder={"Email"}
            clearButtonMode="always"
            autoCorrect={false}
            onChangeText={email => this.setState({ email })}
          />
          <TextInput
            style={styles.input}
            value={password}
            placeholder={"Contraseña"}
            secureTextEntry
            clearButtonMode="always"
            autoCorrect={false}
            onChangeText={password => this.setState({ password })}
          />

          {signup && (
            <TextInput
              style={styles.input}
              value={passwordConfirm}
              placeholder={"Confirmar Contraseña"}
              secureTextEntry
              clearButtonMode="always"
              autoCorrect={false}
              onChangeText={passwordConfirm =>
                this.setState({ passwordConfirm })
              }
            />
          )}
          {errorMessage && <Text>{errorMessage}</Text>}
        </View>
        {!signup && (
          <View style={styles.buttons}>
            <View style={styles.button}>
              <Button
                secondary
                title="Registro"
                onPress={this.toggleSignupLogin}
              />
            </View>
            <View style={styles.button}>
              <Button primary title="Login" onPress={this.loginAction} />
            </View>
          </View>
        )}
        {signup && (
          <View style={styles.buttons}>
            <View style={styles.button}>
              <Button primary title="Registro" onPress={this.signupAction} />
            </View>
            <View style={styles.button}>
              <Button
                secondary
                title="Login"
                onPress={this.toggleSignupLogin}
              />
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default withColors(SignInScreen);
