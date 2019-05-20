import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

class NoteScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> Añadir/Ver/Editar Nota </Text>
      </View>
    );
  }
}

export default NoteScreen;
