import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

function ProductItem({ id, description, price, imageUrl }) {
  return (
    <ScrollView>
      <Pressable style={({ pressed }) => pressed && styles.pressed}>
        <View style={styles.productItem}>
          <View>
            <Text style={[styles.textBase, styles.description]}>
              {description}
            </Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>R$ {price.toFixed(2)}</Text>
          </View>
          <View>
            <Image
              source={{ uri: imageUrl }}
              //resizeMode="cover"
              style={styles.image}
              //resizeMethod="resize"
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
    maxWidth: 70,
    maxHeight: 100,
    height: 100,
    width: 70,
    marginBottom: 4,
    marginTop: 8,
  },
});
