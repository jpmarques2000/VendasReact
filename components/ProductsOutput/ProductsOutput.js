import { StyleSheet, View } from "react-native";

import Button from "../ui/Button";
import ProductsList from "./ProductsList";
import { useNavigation } from "@react-navigation/native";

function ProductsOutput({ products }) {
  const navigation = useNavigation();
  function addProductHandler() {
    navigation.navigate("AddProduct")
  }

  return (
    <View style={styles.container}>
      <ProductsList products={products} />
      <View>
        <Button onPress={addProductHandler}>Novo Produto</Button>
      </View>
    </View>
  );
}

export default ProductsOutput;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    //backgroundColor: "#3374a0",
    flex: 1,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
