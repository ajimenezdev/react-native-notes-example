import React, { Component } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import basicStyles from "ReactNativeNotas/src/styles/basicStyles";
import { FAB } from "ReactNativeNotas/src/components/";
import NoteGridItem from "./NoteGridItem";

const styles = StyleSheet.create({
  container: {
    marginTop: 50
  },
  list: {
    width: "100%"
  }
});

const notas = [
  {
    id: 1,
    title: "Nota 1",
    text: "Contenido nota 1",
    category: "#FFB3BA",
    created: new Date()
  },
  {
    id: 2,
    title: "Nota 2",
    text: "Contenido nota 2",
    category: "#FFDEB9",
    created: new Date()
  },
  {
    id: 3,
    title: "Nota 3",
    text: "Contenido nota 3",
    category: "#B9FFC9",
    created: new Date()
  },
  {
    id: 4,
    title: "Nota 4",
    text: "Contenido nota 4",
    category: "#BAE0FF",
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
  render() {
    return (
      <View style={[basicStyles.container, styles.container]}>
        <Text style={basicStyles.title}>Notas</Text>
        <FlatList
          style={styles.list}
          data={notas}
          keyExtractor={item => item.id}
          numColumns={2}
          renderItem={({ item }) => <NoteGridItem note={item} />}
        />
        <FAB text="+" />
      </View>
    );
  }
}

export default NotesScreen;
