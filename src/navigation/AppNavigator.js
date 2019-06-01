import React from "react";
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator,
  createBottomTabNavigator,
  createMaterialTopTabNavigator
} from "react-navigation";
import { FluidNavigator } from "react-navigation-fluid-transitions";
import {
  NotesScreen,
  NoteScreen,
  CategoriesScreen,
  SignInScreen,
  AuthLoadingScreen,
  StylesSettings,
  AppSettings,
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

const getActiveRouteState = function(route) {
  if (
    !route.routes ||
    route.routes.length === 0 ||
    route.index >= route.routes.length
  ) {
    return route;
  }

  const childActiveRoute = route.routes[route.index];
  return getActiveRouteState(childActiveRoute);
};

const getAppStack = colors => {
  const headerConfig = getHeaderConfig(colors);
  return createAppContainer(
    createDrawerNavigator(
      {
        Notas: createStackNavigator(
          {
            fluidNotes: FluidNavigator({
              Notas: NotesScreen,
              Nota: NoteScreen
            })
          },
          {
            ...headerConfig,
            defaultNavigationOptions: ({ navigation }) => ({
              ...headerConfig.defaultNavigationOptions,
              headerTitle: getActiveRouteState(navigation.state).routeName,
              headerLeft: (
                <DrawerHeaderButton
                  navigation={navigation}
                  showBackButton={
                    getActiveRouteState(navigation.state).routeName !== "Notas"
                  }
                />
              )
            })
          }
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
                App: AppSettings,
                Estilos: StylesSettings,
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
