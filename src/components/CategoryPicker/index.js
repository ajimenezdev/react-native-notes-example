import React from "react";
import { View, Modal, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import getBasicStyles from "ReactNativeNotas/src/styles/basicStyles";
import withColors from "ReactNativeNotas/src/components/withColors";
import ColorView from "../ColorView";
import Text from "../Text";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)" // no need to read it from colors, because it doesn't change, it is for the modal window
  },
  content: {
    padding: 15,
    maxWidth: "80%"
  },
  title: {
    fontWeight: "bold",
    fontSize: 16
  },
  row: {
    flexDirection: "row",
    alignItems: "center"
  }
});

const CategoryPicker = ({
  selectedCategory,
  onChange,
  visible,
  onRequestClose,
  categories,
  colors
}) => {
  const basicStyles = getBasicStyles(colors);
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <View style={styles.container}>
        <View style={[basicStyles.paper, styles.content]}>
          <Text style={styles.title}>Elige categoría:</Text>
          {categories.map(category => (
            <TouchableOpacity
              key={category.id}
              style={styles.row}
              onPress={() => onChange(category)}
            >
              <ColorView color={colors.categoryColors[category.colorIdx]} />
              <Text>{category.category}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

const mapStateToProps = state => {
  return {
    categories: state.categories
  };
};

export default connect(mapStateToProps)(withColors(CategoryPicker));
