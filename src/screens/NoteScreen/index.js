import React, { Component } from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import basicStyles from "ReactNativeNotas/src/styles/basicStyles";
import HR from "ReactNativeNotas/src/components/HR";

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    marginTop: 50
  },
  input: {
    width: "90%"
  },
  title: {
    fontSize: 22,
    fontWeight: "bold"
  },
  note: {
    fontSize: 16
  }
});

class NoteScreen extends Component {
  render() {
    return (
      <View style={[basicStyles.container, styles.container]}>
        <Text style={basicStyles.title}>Crear Nota</Text>
        <TextInput style={[styles.input, styles.title]} placeholder="Título" />
        <HR />
        <TextInput
          style={[styles.input, styles.note]}
          placeholder="Nota"
          multiline={true}
          numberOfLines={4}
        />
      </View>
    );
  }
}

export default NoteScreen;
