import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ColorView } from "ReactNativeNotas/src/components";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // justifyContent: "space-between",
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

const CategoryItem = ({ item, openChangeColor, onChangeText, onRemove }) => {
  const { category, color } = item;
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => openChangeColor(item)}>
        <ColorView color={color} />
      </TouchableOpacity>
      <TextInput
        style={styles.text}
        value={category}
        onChangeText={onChangeText}
      />
      <TouchableOpacity>
        <Icon name="delete" size={25} onPress={onRemove} />
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
)(CategoryItem);
