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
  SignInScreen,
  AuthLoadingScreen,
  StylesSettings,
  SettingsTab2,
  SettingsTab3
} from "ReactNativeNotas/src/screens";
import CustomDrawer from "./CustomDrawer";
import withColors from "ReactNativeNotas/src/components/withColors";
import DrawerHeaderButton from "./DrawerHeaderButton";

const getHeaderConfig = colors => ({
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: colors.primary
    },
    headerTintColor: colors.primaryTextContrast,
    headerTitleStyle: {
      fontWeight: "bold"
    }
  }
});

const getAppStack = colors => {
  const headerConfig = getHeaderConfig(colors);
  return createAppContainer(
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
                Estilos: StylesSettings,
                tab2: SettingsTab2,
                tab3: SettingsTab3
              },
              {
                navigationOptions: ({ navigation }) => ({
                  title: "Ajustes",
                  headerLeft: <DrawerHeaderButton navigation={navigation} />
                }),
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
};

const AppStackComp = ({ colors }) => {
  const AppStack = getAppStack(colors);
  return <AppStack />;
};

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
      App: withColors(AppStackComp),
      Auth: AuthStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
