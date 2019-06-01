import React, { Component } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Snackbar from "react-native-snackbar";
import getBasicStyles from "ReactNativeNotas/src/styles/basicStyles";
import { FAB, Text } from "ReactNativeNotas/src/components/";
import withColors from "ReactNativeNotas/src/components/withColors";
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
import {
  onNotification,
  onNotificationOpened,
  onInitialNotification
} from "ReactNativeNotas/src/utils/Notifications";

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
    this.props.navigation.navigate("Nota", {
      note: note,
      title: note ? "Editar Nota" : "Nueva Nota"
    });
  };

  onNotificationTap = notification => {
    const { notes } = this.props;
    const note = notes.find(n => n.id === notification.data.id);
    this.openNote(note);
  };

  componentDidMount = () => {
    this.props.watchNotes();
    this.props.watchCategories();

    this.removeNotificationListener = onNotification(notification => {
      Snackbar.show({
        title: `${notification.title}: ${notification.body}`,
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          title: "Ver",
          color: "green",
          onPress: () => this.onNotificationTap(notification)
        }
      });
    });

    this.removeNotificationOpenListener = onNotificationOpened(
      ({ notification }) => {
        this.onNotificationTap(notification);
      }
    );

    this.removeOnInitialNotificationListener = onInitialNotification(
      ({ notification }) => {
        this.onNotificationTap(notification);
      }
    );
  };

  componentWillUnmount = () => {
    this.unsubscribeNotes && this.unsubscribeNotes();
    this.unsubscribeCategories && this.unsubscribeCategories();
    this.removeNotificationListener && this.removeNotificationListener();
    this.removeNotificationOpenListener &&
      this.removeNotificationOpenListener();
    this.removeOnInitialNotificationListener &&
      this.removeOnInitialNotificationListener();
  };

  getCategory = categoryId =>
    categoryId &&
    this.props.categories &&
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

const NotesScreenHOC = connect(
  mapStateToProps,
  mapDispatchToProps
)(withColors(NotesScreen));

NotesScreenHOC.navigationOptions = ({ navigation }) => ({
  title: "Notas",
  headerLeft: <DrawerHeaderButton navigation={navigation} />
});

export default NotesScreenHOC;
