import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import getBasicStyles from "ReactNativeNotas/src/styles/basicStyles";
import {
  HR,
  CategoryPicker,
  ColorView,
  Text,
  TextInput
} from "ReactNativeNotas/src/components";
import Button from "ReactNativeNotas/src/components/Button";
import {
  addNote,
  updateNote,
  removeNote
} from "ReactNativeNotas/src/redux/notesReducer";
import withColors from "ReactNativeNotas/src/components/withColors";

const styles = StyleSheet.create({
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
  },
  buttonRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    marginTop: 10
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

  handleChangeCategory = category => {
    this.setState({ modalVisible: false });
    this.updateNoteState({ categoryId: category.id });
  };

  updateNoteState = property => {
    const newNote = { ...this.state.note, ...property };
    this.setState({ note: newNote });
  };

  saveNote = () => {
    const { note } = this.state;
    if (note.id) {
      this.props.updateNote(note);
    } else {
      const resp = this.props.addNote(note);
    }
    this.props.navigation.goBack();
  };

  removeNote = () => {
    this.props.removeNote(this.state.note.id);
    this.props.navigation.goBack();
  };

  getCategory = categoryId =>
    this.props.categories.find(c => c.id === categoryId);

  render() {
    const { colors } = this.props;
    const basicStyles = getBasicStyles(colors);
    const { note, modalVisible } = this.state;
    const { id, title, text, created, categoryId } = note || {};
    const category = this.getCategory(categoryId);
    return (
      <View style={basicStyles.container}>
        <View style={[basicStyles.paper, { width: "100%" }]}>
          <View style={styles.timestamp}>
            {created && (
              <Text>
                {new Date(created).toLocaleTimeString()} -{" "}
                {new Date(created).toLocaleDateString()}
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
        </View>
        <View style={[styles.buttonRow]}>
          {id && <Button danger title="Borrar" onPress={this.removeNote} />}
          <Button primary title="Guardar" onPress={this.saveNote} />
        </View>
        <CategoryPicker
          visible={modalVisible}
          onChange={this.handleChangeCategory}
          onRequestClose={this.toggleCategoryPicker}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addNote,
      updateNote,
      removeNote
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withColors(NoteScreen));
