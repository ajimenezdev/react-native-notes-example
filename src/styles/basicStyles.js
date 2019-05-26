import { StyleSheet } from "react-native";

const styles = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      padding: 10,
      backgroundColor: colors && colors.background
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      margin: 20
    },
    paper: {
      backgroundColor: colors && colors.backgroundContent,
      padding: 15,
      margin: 5,
      elevation: 3,
      shadowColor: colors && colors.shadowColor,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2
    }
  });

export default styles;
