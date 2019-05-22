import React from "react";
import { View, StyleSheet } from "react-native";
const styles = StyleSheet.create({
  colorView: {
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 5
  }
});

const ColorView = ({ color, ...props }) => (
  <View
    {...props}
    style={[styles.colorView, color && { backgroundColor: color }]}
  />
);

export default ColorView;
