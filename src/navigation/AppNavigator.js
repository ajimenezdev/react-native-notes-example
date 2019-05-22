import React from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";

import {
  NotesScreen,
  NoteScreen,
  CategoriesScreen,
  SettingsScreen
} from "ReactNativeNotas/src/screens";

export default createAppContainer(
  createStackNavigator(
    {
      Notes: NotesScreen,
      Note: NoteScreen,
      Categories: CategoriesScreen,
      Settings: SettingsScreen
    },
    {
      initialRouteName: "Notes",
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: "#0066ff"
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold"
        }
      }
    }
  )
);
