import React from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import { DrawerItems } from "react-navigation";

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

const CustomDrawer = props => (
  <ScrollView contentContainerStyle={{ flex: 1 }}>
    <View style={styles.header}>
      <Text style={styles.headerFooterText}>Header</Text>
    </View>
    <View style={styles.items}>
      <DrawerItems style={{ flex: 1 }} {...props} />
    </View>
    <View style={styles.footer}>
      <Text style={styles.headerFooterText}>Footer</Text>
    </View>
  </ScrollView>
);

export default CustomDrawer;
