import { FlatList } from "react-native";

import ProductItem from "./ProductItem";

function renderProductItem(itemData) {
  return <ProductItem {...itemData.item} />;
}

function ProductsList({ products }) {
  return (
    <FlatList
      data={products}
      renderItem={renderProductItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default ProductsList;
