import React from "react";
import {
  createAppContainer,
  createStackNavigator,
  createDrawerNavigator
} from "react-navigation";

import {
  NotesScreen,
  NoteScreen,
  CategoriesScreen,
  SettingsScreen
} from "ReactNativeNotas/src/screens";
import CustomDrawer from "./CustomDrawer";

export default createAppContainer(
  createDrawerNavigator(
    {
      Notas: createStackNavigator({
        NotesList: NotesScreen,
        Note: NoteScreen
      }),
      Categorías: CategoriesScreen,
      Ajustes: SettingsScreen
    },
    {
      contentComponent: props => <CustomDrawer {...props} />
    }
  )
);
