import { StyleSheet } from "react-native";
import { colors } from "ReactNativeNotas/src/components/withColors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 20
  },
  paper: {
    backgroundColor: colors.background,
    padding: 5,
    margin: 5,
    elevation: 3,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2
  }
});

export default styles;
