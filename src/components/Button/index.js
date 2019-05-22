import React from "react";
import { Button } from "react-native";

const primaryColor = "#0066ff";
const secondaryColor = "#ccc";
const accentColor = "#00bfa5";

const CustomButton = ({ primary, secondary, accent, ...props }) => (
  <Button
    color={
      (primary && primaryColor) ||
      (secondary && secondaryColor) ||
      (accent && accentColor)
    }
    {...props}
  />
);

export default CustomButton;
