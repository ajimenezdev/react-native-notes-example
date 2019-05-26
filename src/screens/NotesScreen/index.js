import React, { Component } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import getBasicStyles from "ReactNativeNotas/src/styles/basicStyles";
import { FAB, Text } from "ReactNativeNotas/src/components/";
import withColors from "ReactNativeNotas/src/components/withColors";
import DrawerHeaderButton from "ReactNativeNotas/src/navigation/DrawerHeaderButton";
import NoteGridItem from "./NoteGridItem";

const styles = StyleSheet.create({
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
  openNote = note => {
    this.props.navigation.navigate("Note", {
      note: note,
      title: note ? "Editar Nota" : "Nueva Nota"
    });
  };

  getCategory = categoryId =>
    this.props.categories.find(c => c.id === categoryId);

  render() {
    const { notes, colors } = this.props;
    const basicStyles = getBasicStyles(colors);
    return (
      <View style={basicStyles.container}>
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.contentContainer}
          data={notes}
          keyExtractor={item => item.id}
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
  return bindActionCreators({}, dispatch);
};

const NotesScreenHOC = connect(
  mapStateToProps,
  mapDispatchToProps
)(withColors(NotesScreen));

NotesScreenHOC.navigationOptions = ({ navigation }) => ({
  title: "Notas",
  headerLeft: <DrawerHeaderButton navigation={navigation} />
});

export default NotesScreenHOC;
