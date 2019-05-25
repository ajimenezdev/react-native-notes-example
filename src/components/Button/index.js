import React from "react";
import { Button } from "react-native";
import withColors from "../withColors";

const CustomButton = ({
  primary,
  secondary,
  accent,
  danger,
  colors,
  ...props
}) => (
  <Button
    color={
      (primary && colors.primary) ||
      (secondary && colors.secondary) ||
      (accent && colors.accent) ||
      (danger && colors.danger)
    }
    {...props}
  />
);

export default withColors(CustomButton);
