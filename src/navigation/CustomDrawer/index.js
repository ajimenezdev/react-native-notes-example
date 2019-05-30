import React from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DrawerItems } from "react-navigation";
import firebase from "react-native-firebase";
import { logout } from "ReactNativeNotas/src/redux/rootReducer";

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#ddd",
    padding: 10,
    paddingTop: 40
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

  handleLogout = () => {
    firebase.auth().signOut();
    this.props.logout();
  };

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
        <TouchableOpacity style={styles.footer} onPress={this.handleLogout}>
          <Text style={styles.headerFooterText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      logout
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomDrawer);
