import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import basicStyles from "ReactNativeNotas/src/styles/basicStyles";
import { HR, CategoryPicker, ColorView } from "ReactNativeNotas/src/components";
import Button from "ReactNativeNotas/src/components/Button";

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start"
  },
  input: {
    width: "90%"
  },
  title: {
    fontSize: 22,
    fontWeight: "bold"
  },
  note: {
    fontSize: 16,
    textAlignVertical: "top"
  },
  timestamp: {
    width: "100%",
    alignItems: "flex-end",
    paddingRight: 15
  },
  categoryRow: {
    width: "100%",
    paddingLeft: 15,
    flexDirection: "row",
    alignItems: "center"
  }
});

class NoteScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title
  });

  constructor(props) {
    super(props);

    this.state = {
      note: props.navigation.getParam("note"),
      modalVisible: false
    };
  }

  toggleCategoryPicker = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  handleChangeColor = category => {
    this.setState({ modalVisible: false });
    this.updateNoteState({ category });
  };

  updateNoteState = property => {
    const newNote = { ...this.state.note, ...property };
    this.setState({ note: newNote });
  };

  render() {
    const { note, modalVisible } = this.state;
    const { title, text, created, category } = note || {};
    return (
      <View style={[basicStyles.container, styles.container]}>
        <View style={styles.timestamp}>
          {created && (
            <Text>
              {created.toLocaleTimeString()} - {created.toLocaleDateString()}
            </Text>
          )}
        </View>
        <TextInput
          style={[styles.input, styles.title]}
          placeholder="Título"
          value={title}
          onChangeText={text => this.updateNoteState({ title: text })}
        />
        <HR />
        <TextInput
          style={[styles.input, styles.note]}
          placeholder="Nota"
          multiline={true}
          numberOfLines={4}
          value={text}
          onChangeText={text => this.updateNoteState({ text })}
        />
        <TouchableOpacity
          style={styles.categoryRow}
          onPress={this.toggleCategoryPicker}
        >
          {category && (
            <React.Fragment>
              <ColorView color={category.color} />
              <Text>{category.category}</Text>
            </React.Fragment>
          )}
          {!category && <Text>Elige categoría</Text>}
        </TouchableOpacity>
        <Button accent title="Guardar" />
        <CategoryPicker
          visible={modalVisible}
          onChange={this.handleChangeColor}
          onRequestClose={this.toggleCategoryPicker}
        />
      </View>
    );
  }
}

export default NoteScreen;
