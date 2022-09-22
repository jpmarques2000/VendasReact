import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

function Header({ children, onPress }) {
  <View style={styles.header}>
    {/* <MaterialIcons
      name="menu"
      size={28}
      onPress={onPress}
      style={styles.icon}
    /> */}
    <View>
      <Text style={styles.headerText}>Teste</Text>
    </View>
  </View>;
}

export default Header;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#333",
    letterSpacing: 1,
  },
//   icon: {
//     position: "absolute",
//     left: 16,
//   },
});
