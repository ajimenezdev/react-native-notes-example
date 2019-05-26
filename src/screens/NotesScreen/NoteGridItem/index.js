import React, { Component } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Animated,
  Easing
} from "react-native";
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
      isMenuOpen: false,
      scaleAnim: new Animated.Value(1)
    };
  }

  editFromMenu = note => {
    this.setState({ isMenuOpen: false });
    this.props.onPress(note);
  };

  deleteFromMenu = note => {
    this.setState({ isMenuOpen: false });
    Animated.timing(this.state.scaleAnim, {
      toValue: 0,
      duration: 500,
      easing: Easing.inOut(Easing.cubic)
    }).start(() => this.props.removeNote(note.id));
  };

  render() {
    const { note, category, onPress, colors } = this.props;
    const { title, text } = note;
    const basicStyles = getBasicStyles(colors);
    const { isMenuOpen, scaleAnim } = this.state;
    return (
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ scale: scaleAnim }]
          }
        ]}
      >
        <TouchableOpacity
          style={[
            basicStyles.paper,
            { flex: 1 },
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
      </Animated.View>
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
