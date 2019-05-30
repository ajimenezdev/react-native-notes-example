import React from "react";
import { Text } from "react-native";
import withColors from "../withColors";

const CustomText = ({ children, style, colors, ...props }) => (
  <Text style={[{ color: colors.text }, style]} {...props}>
    {children}
  </Text>
);

export default withColors(CustomText);
