import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import basicStyles from "ReactNativeNotas/src/styles/basicStyles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 130
  },
  title: {
    fontWeight: "bold"
  },
  text: {}
});

const NoteGridItem = ({ note, onPress }) => {
  const { title, text, category } = note;
  return (
    <TouchableOpacity
      style={[
        basicStyles.paper,
        styles.container,
        { backgroundColor: category || "white" }
      ]}
      onPress={onPress}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text} numberOfLines={5}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default NoteGridItem;
