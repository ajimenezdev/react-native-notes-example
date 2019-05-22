import React from "react";
import {
  createAppContainer,
  createStackNavigator,
  createDrawerNavigator,
  createBottomTabNavigator,
  createMaterialTopTabNavigator
} from "react-navigation";

import {
  NotesScreen,
  NoteScreen,
  CategoriesScreen,
  SettingsScreen,
  SettingsTab1,
  SettingsTab2,
  SettingsTab3
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
      Ajustes: createStackNavigator(
        {
          tab: createMaterialTopTabNavigator(
            {
              tab1: SettingsTab1,
              tab2: SettingsTab2,
              tab3: SettingsTab3
            },
            {
              navigationOptions: {
                title: "Ajustes"
              },
              tabBarOptions: {
                style: {
                  backgroundColor: "#0066ff",
                  elevation: 0
                }
              }
            }
          )
        },
        {
          ...headerConfig,
          defaultNavigationOptions: {
            ...headerConfig.defaultNavigationOptions,
            headerStyle: {
              ...headerConfig.defaultNavigationOptions.headerStyle,
              elevation: 0
            }
          }
        }
      )
    },
    {
      contentComponent: props => <CustomDrawer {...props} />
    }
  )
);
