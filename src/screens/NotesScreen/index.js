import React, { Component } from "react";
import { Text, View } from "react-native";

import basicStyles from "notas/src/styles/basicStyles";

class NotesScreen extends Component {
  render() {
    return (
      <View style={basicStyles.container}>
        <Text> Pantalla Notas </Text>
      </View>
    );
  }
}

export default NotesScreen;
