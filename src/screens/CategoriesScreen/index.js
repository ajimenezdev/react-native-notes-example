import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity
} from "react-native";
import basicStyles from "ReactNativeNotas/src/styles/basicStyles";
import { HR, ColorPicker } from "ReactNativeNotas/src/components";
import CategoryItem from "./CategoryItem";

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    marginTop: 50
  },
  row: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  list: {
    width: "100%"
  },
  addInput: {
    flex: 1
  },
  colorView: {
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 5
  }
});

const categories = [
  {
    id: 1,
    category: "Personal",
    color: "#FFB3BA"
  },
  {
    id: 2,
    category: "Trabajo",
    color: "#FFDEB9"
  },
  {
    id: 3,
    category: "Casa",
    color: "#FFFFB9"
  }
];

class CategoriesScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      itemSelected: null,
      newColor: "#B9FFC9"
    };
  }

  openChangeColor = item => {
    this.setState({
      modalVisible: true,
      itemSelected: item
    });
  };

  handleChangeColor = color => {
    this.setState({ modalVisible: false, itemSelected: null });

    // TODO: actualizar color
  };

  render() {
    const { modalVisible, itemSelected, newColor } = this.state;
    return (
      <View style={[basicStyles.container, styles.container]}>
        <Text style={basicStyles.title}>Categorías</Text>
        <View style={styles.row}>
          <TextInput style={styles.addInput} placeholder="Nueva categoría" />
          <TouchableOpacity onPress={() => this.openChangeColor(null)}>
            <View style={[styles.colorView, { backgroundColor: newColor }]} />
          </TouchableOpacity>
          <Button title="+" />
        </View>
        <HR />
        <FlatList
          style={styles.list}
          data={categories}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <CategoryItem item={item} openChangeColor={this.openChangeColor} />
          )}
          ItemSeparatorComponent={() => <HR color="#aaa" size="100%" />}
        />
        <ColorPicker
          visible={modalVisible}
          onChange={this.handleChangeColor}
          selectedColor={itemSelected ? itemSelected.color : newColor}
        />
      </View>
    );
  }
}

export default CategoriesScreen;
