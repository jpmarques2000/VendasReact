import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../components/ui/Button";
import { AuthContext } from "../store/auth-context";

function HomeScreen() {
  const authCtx = useContext(AuthContext);

  function logoutHandler() {
    authCtx.logout();
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Tela Principal</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button style={styles.button} onPress={logoutHandler}>
          Deslogar
        </Button>
      </View>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  textContainer: {
    justifyContent: "flex-start",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  button: {
    padding: 8,
  },
  buttonContainer: {
    marginTop: 16,
  },
});
