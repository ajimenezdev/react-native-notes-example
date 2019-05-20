import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

class NotesScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> Pantalla Notas </Text>
      </View>
    );
  }
}

export default NotesScreen;
