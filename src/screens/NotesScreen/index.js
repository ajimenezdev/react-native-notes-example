import React, { Component } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import basicStyles from "ReactNativeNotas/src/styles/basicStyles";
import { FAB } from "ReactNativeNotas/src/components/";
import DrawerHeaderButton from "ReactNativeNotas/src/navigation/DrawerHeaderButton";
import NoteGridItem from "./NoteGridItem";
import {
  watchNotes,
  unsubscribeNotes
} from "ReactNativeNotas/src/redux/notesReducer";
import {
  watchCategories,
  unsubscribeCategories
} from "ReactNativeNotas/src/redux/categoriesReducer";

const styles = StyleSheet.create({
  container: {},
  list: {
    width: "100%"
  },
  contentContainer: {
    flexGrow: 1
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

class NotesScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Notas",
    headerLeft: <DrawerHeaderButton navigation={navigation} />
  });

  componentDidMount = () => {
    this.props.watchNotes();
    this.props.watchCategories();
  };

  componentWillUnmount = () => {
    unsubscribeCategories();
    unsubscribeNotes();
  };

  openNote = note => {
    this.props.navigation.navigate("Note", {
      note: note,
      title: note ? "Editar Nota" : "Nueva Nota"
    });
  };

  getCategory = categoryId =>
    categoryId &&
    this.props.categories &&
    this.props.categories.find(c => c.id === categoryId);

  render() {
    const { notes } = this.props;
    return (
      <View style={[basicStyles.container, styles.container]}>
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.contentContainer}
          data={notes}
          keyExtractor={item => item && item.id}
          numColumns={2}
          renderItem={({ item }) => (
            <NoteGridItem
              note={item}
              category={this.getCategory(item.categoryId)}
              onPress={this.openNote}
            />
          )}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text>No tienes ninguna nota</Text>
              <Text>Toca el botón inferior "+" para añadir notas</Text>
            </View>
          }
        />
        <FAB accent text="+" onPress={() => this.openNote(null)} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    notes: state.notes,
    categories: state.categories
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      watchNotes,
      watchCategories
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotesScreen);
