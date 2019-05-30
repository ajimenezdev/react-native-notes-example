import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import withColors from "../withColors";
import Text from "../Text";

const size = 50;

const styles = StyleSheet.create({
  fabContainer: {
    height: size,
    width: size,
    borderRadius: size / 2,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 1, height: 3 },
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
    position: "absolute",
    bottom: 50,
    right: 20
  },
  fabText: {
    color: "#fff",
    fontWeight: "bold"
  }
});

const FAB = props => {
  const {
    style,
    textStyle,
    text,
    children,
    primary,
    secondary,
    accent,
    colors,
    ...otherProps
  } = props;
  return (
    <TouchableOpacity
      style={[
        styles.fabContainer,
        style,
        {
          backgroundColor:
            (primary && colors.primary) ||
            (secondary && colors.secondary) ||
            (accent && colors.accent) ||
            primaryColor
        }
      ]}
      {...otherProps}
    >
      {text && <Text style={styles.fabText}>{text}</Text>}
      {!text && children}
    </TouchableOpacity>
  );
};

export default withColors(FAB);
