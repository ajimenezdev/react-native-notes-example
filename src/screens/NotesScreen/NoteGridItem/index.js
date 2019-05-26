import React, { Component } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from "react-native-popup-menu";
import { removeNote } from "ReactNativeNotas/src/redux/notesReducer";
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

class NoteGridItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMenuOpen: false
    };
  }

  editFromMenu = note => {
    this.setState({ isMenuOpen: false });
    this.props.onPress(note);
  };

  deleteFromMenu = note => {
    this.props.removeNote(note.id);
  };

  render() {
    const { note, category, onPress, colors } = this.props;
    const { title, text } = note;
    const basicStyles = getBasicStyles(colors);
    const { isMenuOpen } = this.state;
    return (
      <TouchableOpacity
        style={[
          basicStyles.paper,
          styles.container,
          {
            backgroundColor:
              (category && colors.categoryColors[category.colorIdx]) ||
              colors.backgroundContent
          }
        ]}
        onPress={() => onPress(note)}
        onLongPress={() => this.setState({ isMenuOpen: true })}
      >
        <Menu opened={isMenuOpen}>
          <MenuTrigger />
          <MenuOptions opened={isMenuOpen}>
            <MenuOption
              triggerOnLongPress
              onSelect={() => this.editFromMenu(note)}
              text={"Editar"}
            />
            <View style={styles.divider} />
            <MenuOption
              onSelect={() => this.deleteFromMenu(note)}
              text="Borrar"
            />
          </MenuOptions>
        </Menu>
        <Text style={styles.title}>{title}</Text>
        <Text numberOfLines={5}>{text}</Text>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      removeNote
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withColors(NoteGridItem));
