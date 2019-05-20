import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

class CategoriesScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> Categorías de notas </Text>
      </View>
    );
  }
}

export default CategoriesScreen;
