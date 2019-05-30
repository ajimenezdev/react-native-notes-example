import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ColorView, Text, TextInput } from "ReactNativeNotas/src/components";
import withColors from "ReactNativeNotas/src/components/withColors";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10
  },
  text: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10
  }
});

const CategoryItem = ({
  item,
  openChangeColor,
  onChangeText,
  onRemove,
  colors
}) => {
  const { category, colorIdx } = item;
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => openChangeColor(item)}>
        <ColorView color={colors.categoryColors[colorIdx]} />
      </TouchableOpacity>
      <TextInput
        style={styles.text}
        value={category}
        onChangeText={onChangeText}
      />
      <TouchableOpacity>
        <Icon
          name="delete"
          size={25}
          onPress={onRemove}
          style={{ color: colors.text }}
        />
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    categories: state.categories
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withColors(CategoryItem));
