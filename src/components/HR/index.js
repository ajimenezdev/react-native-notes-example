import React from "react";
import { View } from "react-native";
import withColors from "ReactNativeNotas/src/components/withColors";
import { Text } from "ReactNativeNotas/src/components";

const HR = ({ size, color, colors }) => (
  <View
    style={{
      borderBottomColor: color || colors.secondary,
      borderBottomWidth: 1,
      marginTop: 10,
      marginBottom: 10,
      width: size || "100%"
    }}
  />
);

export default withColors(HR);
