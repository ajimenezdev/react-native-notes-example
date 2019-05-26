import React from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { DrawerItems } from "react-navigation";
import firebase from "react-native-firebase";
import { Text } from "ReactNativeNotas/src/components";
import withColors from "ReactNativeNotas/src/components/withColors";

const getStyles = colors =>
  StyleSheet.create({
    header: {
      backgroundColor: colors.primary,
      padding: 10,
      paddingTop: 40
    },
    headerFooterText: {
      fontSize: 18,
      fontWeight: "bold"
    },
    items: {
      flex: 1,
      backgroundColor: colors.background
    },
    footer: {
      backgroundColor: colors.primary,
      padding: 10,
      paddingBottom: 40
    }
  });

class CustomDrawer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null
    };
  }

  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
  }

  render() {
    const { colors } = this.props;
    const styles = getStyles(colors);
    const { currentUser } = this.state;
    return (
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.headerFooterText}>
            {currentUser && currentUser.email}
          </Text>
        </View>
        <View style={styles.items}>
          <DrawerItems
            style={{ flex: 1 }}
            labelStyle={{ color: colors.placeHolder }}
            activeLabelStyle={{ color: colors.text }}
            activeBackgroundColor={colors.backgroundContent}
            {...this.props}
          />
        </View>
        <TouchableOpacity
          style={styles.footer}
          onPress={() => firebase.auth().signOut()}
        >
          <Text style={styles.headerFooterText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

export default withColors(CustomDrawer);
