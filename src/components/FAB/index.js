import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const size = 50;

const styles = StyleSheet.create({
  fabContainer: {
    height: size,
    width: size,
    borderRadius: size / 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0000ff",
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
  const { style, textStyle, text, children, ...otherProps } = props;
  return (
    <TouchableOpacity style={[styles.fabContainer, style]} {...otherProps}>
      {text && <Text style={styles.fabText}>{text}</Text>}
      {!text && children}
    </TouchableOpacity>
  );
};

export default FAB;
