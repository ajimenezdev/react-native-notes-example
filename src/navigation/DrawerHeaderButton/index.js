import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import withColors from "ReactNativeNotas/src/components/withColors";

const DrawerHeaderButton = ({ navigation, showBackButton, colors }) => (
  <TouchableOpacity
    onPress={() =>
      showBackButton ? navigation.pop() : navigation.openDrawer()
    }
  >
    <Icon
      style={{ color: colors.headerText, marginLeft: 15 }}
      name={showBackButton ? "arrow-left" : "menu"}
      size={25}
    />
  </TouchableOpacity>
);

export default withColors(DrawerHeaderButton);
