import React, { Component } from "react";
import { Text, View } from "react-native";
import basicStyles from "notas/src/styles/basicStyles";

class CategoriesScreen extends Component {
  render() {
    return (
      <View style={basicStyles.container}>
        <Text> Categorías de notas </Text>
      </View>
    );
  }
}

export default CategoriesScreen;
