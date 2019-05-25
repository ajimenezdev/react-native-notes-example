import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "ReactNativeNotas/src/components";
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

const NoteGridItem = ({ note, category, onPress }) => {
  const { title, text } = note;
  return (
    <TouchableOpacity
      style={[
        basicStyles.paper,
        styles.container,
        { backgroundColor: (category && category.color) || "white" }
      ]}
      onPress={() => onPress(note)}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text} numberOfLines={5}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default NoteGridItem;
