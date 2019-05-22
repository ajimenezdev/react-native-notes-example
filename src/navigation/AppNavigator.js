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

const headerConfig = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: "#0066ff"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  }
};

export default createAppContainer(
  createDrawerNavigator(
    {
      Notas: createStackNavigator(
        {
          NotesList: NotesScreen,
          Note: NoteScreen
        },
        headerConfig
      ),
      Categorías: createStackNavigator(
        {
          CategoriesScreen: CategoriesScreen
        },
        headerConfig
      ),
      Ajustes: SettingsScreen
    },
    {
      contentComponent: props => <CustomDrawer {...props} />
    }
  )
);
