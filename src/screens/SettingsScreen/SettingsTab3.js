import React, { Component } from "react";
import { View } from "react-native";
import getBasicStyles from "ReactNativeNotas/src/styles/basicStyles";
import withColors from "ReactNativeNotas/src/components/withColors";
import { Text } from "ReactNativeNotas/src/components";

class SettingsScreen extends Component {
  render() {
    const { colors } = this.props;
    const basicStyles = getBasicStyles(colors);
    return (
      <View style={basicStyles.container}>
        <Text> Pantalla Ajustes Tab 3</Text>
      </View>
    );
  }
}

export default withColors(SettingsScreen);
