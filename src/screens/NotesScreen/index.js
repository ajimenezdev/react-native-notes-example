import React, { Component } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import basicStyles from "ReactNativeNotas/src/styles/basicStyles";
import { FAB } from "ReactNativeNotas/src/components/";
import DrawerHeaderButton from "ReactNativeNotas/src/navigation/DrawerHeaderButton";
import NoteGridItem from "./NoteGridItem";

const styles = StyleSheet.create({
  container: {},
  list: {
    width: "100%"
  }
});

const notas = [
  {
    id: 1,
    title: "Nota 1",
    text: "Contenido nota 1",
    category: {
      category: "Personal",
      color: "#FFB3BA"
    },
    created: new Date()
  },
  {
    id: 2,
    title: "Nota 2",
    text: "Contenido nota 2",
    category: {
      category: "Trabajo",
      color: "#FFDEB9"
    },
    created: new Date()
  },
  {
    id: 3,
    title: "Nota 3",
    text: "Contenido nota 3",
    category: {
      category: "Casa",
      color: "#FFFFB9"
    },
    created: new Date()
  },
  {
    id: 4,
    title: "Nota 4",
    text: "Contenido nota 4",
    category: {
      category: "Viaje",
      color: "#BAE0FF"
    },
    created: new Date()
  },
  {
    id: 5,
    title: "Nota 5",
    text: "Contenido nota 5",
    created: new Date()
  },
  {
    id: 6,
    title: "Nota 6",
    text:
      "Et voluptate qui ut incididunt mollit. Aliqua anim ipsum non commodo. Cillum esse nisi Lorem est sit officia sunt id officia. Aliqua cillum eu ut quis enim sint laboris ullamco est nisi veniam veniam ut do. Deserunt aliqua voluptate cillum dolor aliquip sit esse. Deserunt elit magna reprehenderit aliqua. Nulla consectetur laborum dolore nulla nisi nisi anim ad dolore elit voluptate.",
    created: new Date()
  }
];

class NotesScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Notas",
    headerLeft: <DrawerHeaderButton navigation={navigation} />
  });

  openNote = note => {
    this.props.navigation.navigate("Note", {
      note: note,
      title: note ? "Editar Nota" : "Nueva Nota"
    });
  };

  render() {
    return (
      <View style={[basicStyles.container, styles.container]}>
        <FlatList
          style={styles.list}
          data={notas}
          keyExtractor={item => item.id}
          numColumns={2}
          renderItem={({ item }) => (
            <NoteGridItem note={item} onPress={this.openNote} />
          )}
        />
        <FAB accent text="+" onPress={() => this.openNote(null)} />
      </View>
    );
  }
}

export default NotesScreen;
