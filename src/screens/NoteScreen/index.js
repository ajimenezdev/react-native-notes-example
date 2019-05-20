import React, { Component } from "react";
import { Text, View } from "react-native";
import basicStyles from "notas/src/styles/basicStyles";

class NoteScreen extends Component {
  render() {
    return (
      <View style={basicStyles.container}>
        <Text> Añadir/Ver/Editar Nota </Text>
      </View>
    );
  }
}

export default NoteScreen;
