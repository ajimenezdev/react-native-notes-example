import React from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { DrawerItems } from "react-navigation";
import firebase from "react-native-firebase";

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#ddd",
    padding: 10
  },
  headerFooterText: {
    fontSize: 18,
    fontWeight: "bold"
  },
  items: {
    flex: 1
  },
  footer: {
    backgroundColor: "#ddd",
    padding: 10
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
    const { currentUser } = this.state;
    return (
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.headerFooterText}>
            {currentUser && currentUser.email}
          </Text>
        </View>
        <View style={styles.items}>
          <DrawerItems style={{ flex: 1 }} {...this.props} />
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

export default CustomDrawer;
