import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { colors } from "../withColors";

const styles = StyleSheet.create({
  text: {
    color: colors.text
  }
});

const CustomTextInput = ({ style, ...props }) => (
  <TextInput
    style={[styles.text, style]}
    placeholderTextColor={colors.placeHolder}
    {...props}
  />
);

export default CustomTextInput;
