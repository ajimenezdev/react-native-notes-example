import React from "react";
import {
  createAppContainer,
  createSwitchNavigator,
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
  SignInScreen,
  AuthLoadingScreen,
  SettingsTab1,
  SettingsTab2,
  SettingsTab3
} from "ReactNativeNotas/src/screens";
import CustomDrawer from "./CustomDrawer";
import { colors } from "ReactNativeNotas/src/components/withColors";

const headerConfig = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: colors.primary
    },
    headerTintColor: colors.primaryTextContrast,
    headerTitleStyle: {
      fontWeight: "bold"
    }
  }
};

const AppStack = createAppContainer(
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
                  backgroundColor: colors.primary,
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

const AuthStack = createStackNavigator(
  { SignIn: SignInScreen },
  {
    mode: "modal",
    headerMode: "none"
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
