/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import { MenuProvider } from "react-native-popup-menu";
import configureStore from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import AppNavigator from "./src/navigation/AppNavigator";

const { store, persistor } = configureStore();

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <React.Fragment>
        <StatusBar barStyle="light-content" />
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <MenuProvider>
              <AppNavigator />
            </MenuProvider>
          </PersistGate>
        </Provider>
      </React.Fragment>
    );
  }
}
