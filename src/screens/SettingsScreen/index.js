import React, { Component } from "react";
import { Text, View } from "react-native";
import basicStyles from "notas/src/styles/basicStyles";

class SettingsScreen extends Component {
  render() {
    return (
      <View style={basicStyles.container}>
        <Text> Pantalla Ajustes </Text>
      </View>
    );
  }
}

export default SettingsScreen;
