import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import IconButton from "../ui/IconButton";

function ProductItem({ id, description, amount, image }) {
  const navigation = useNavigation();

  function addProductHandler() {
    navigation.navigate("Novo Produto", {
      productId: id,
    });
  }

  return (
    <ScrollView>
      <Pressable
        onPress={addProductHandler}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={styles.productItem}>
          <View style={styles.productImageContainer}>
            <View style={styles.productContainer}>
              <View>
                <Text style={[styles.textBase, styles.description]}>
                  {description}
                </Text>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>R$ {amount}</Text>
              </View>
            </View>
            <View>
              <Image
                source={{ uri: image }}
                //resizeMode="cover"
                style={styles.image}
                //resizeMethod="resize"
              />
            </View>
            <IconButton
              icon="add-circle"
              size={30}
              color="blue"
              onPress={addProductHandler.bind(id)}
            />
            <IconButton
              icon="remove-circle"
              size={30}
              color="red"
              onPress={addProductHandler}
            />
          </View>
        </View>
      </Pressable>
    </ScrollView>
  );
}

export default ProductItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  productContainer: {
    flexDirection: "column",
    marginRight: 8,
    maxWidth: 137,
    minWidth: 137,
  },
  productImageContainer: {
    flexDirection: "row",
  },
  productItem: {
    padding: 12,
    marginVertical: 8,
    //backgroundColor: "#3374a0",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: 1,
    elevation: 1,
    shadowColor: "#black",
    shadowRadius: 1,
    //shadowOffset: { width: 0, height: 0 },
    //shadowOpacity: 0.4,
  },
  textBase: {
    color: "##000000af",
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  priceContainer: {
    //paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "#white",
    justifyContent: "center",
    //alignItems: "center",
    borderRadius: 4,
    minWidth: 80,
  },
  price: {
    color: "##ec5656",
    fontWeight: "bold",
  },
  image: {
    maxWidth: 110,
    maxHeight: 100,
    height: 100,
    width: 110,
  },
});
