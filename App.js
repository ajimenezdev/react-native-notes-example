/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { StatusBar } from "react-native";
import AppNavigator from "./src/navigation/AppNavigator";

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <React.Fragment>
        <StatusBar barStyle="light-content" />
        <AppNavigator />
      </React.Fragment>
    );
  }
}
