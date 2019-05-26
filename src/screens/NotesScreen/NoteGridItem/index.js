import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "ReactNativeNotas/src/components";
import withColors from "ReactNativeNotas/src/components/withColors";
import getBasicStyles from "ReactNativeNotas/src/styles/basicStyles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 130
  },
  title: {
    fontWeight: "bold"
  }
});

const NoteGridItem = ({ note, category, onPress, colors }) => {
  const { title, text } = note;
  const basicStyles = getBasicStyles(colors);
  return (
    <TouchableOpacity
      style={[
        basicStyles.paper,
        styles.container,
        {
          backgroundColor:
            (category && category.color) || colors.backgroundContent
        }
      ]}
      onPress={() => onPress(note)}
    >
      <Text style={styles.title}>{title}</Text>
      <Text numberOfLines={5}>{text}</Text>
    </TouchableOpacity>
  );
};

export default withColors(NoteGridItem);
