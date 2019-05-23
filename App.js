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
import configureStore from "./src/redux/store";
import AppNavigator from "./src/navigation/AppNavigator";

const store = configureStore();

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <React.Fragment>
        <StatusBar barStyle="light-content" />
        <Provider store={store}>
          <AppNavigator />
        </Provider>
      </React.Fragment>
    );
  }
}
