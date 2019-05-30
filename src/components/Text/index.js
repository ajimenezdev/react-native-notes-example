import React from "react";
import { Text, StyleSheet } from "react-native";
import { colors } from "../withColors";

const styles = StyleSheet.create({
  text: {
    color: colors.text
  }
});

const CustomText = ({ children, style, ...props }) => (
  <Text style={[styles.text, style]} {...props}>
    {children}
  </Text>
);

export default CustomText;
