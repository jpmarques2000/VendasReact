import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../components/ui/Button";
import { AuthContext } from "../store/auth-context";
import Header from "../components/ui/Header";
import IconButton from "../components/ui/IconButton";

function HomeScreen() {
  const authCtx = useContext(AuthContext);

  function logoutHandler() {
    authCtx.logout();
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Tela Principal</Text>
        </View>
        <View style={styles.buttonContainer}>
          <IconButton
            icon="log-out"
            size={25}
            color="#blue"
            onPress={logoutHandler}
          />
        </View>
      </View>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  headerContainer: {
    width: "100%",
    height: "30%",
    flexDirection: "row",
    //alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#gray",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  textContainer: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#333",
    letterSpacing: 1,
  },
  button: {
    padding: 8,
  },
  buttonContainer: {
    flexDirection: "column",
    // borderWidth: 1,
    // justifyContent: "flex-start",
    // alignItems: "flex-start"
  },
});
