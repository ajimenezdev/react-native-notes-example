import React, { Component } from "react";
import { View } from "react-native";
import basicStyles from "ReactNativeNotas/src/styles/basicStyles";
import { Text } from "ReactNativeNotas/src/components";

class SettingsScreen extends Component {
  render() {
    return (
      <View style={basicStyles.container}>
        <Text> Pantalla Ajustes Tab 1</Text>
      </View>
    );
  }
}

export default SettingsScreen;
