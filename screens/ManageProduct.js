import { useContext, useLayoutEffect, useState } from "react";
import { View } from "react-native";

import ProductForm from "../components/ManageInputs/ProductForm";
import { ProductsContext } from "../store/products-context";
import { storeProduct } from "../util/http";

function ManageProduct({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();

  const productsCtx = useContext(ProductsContext);

  const editedProductId = route.params?.productId;
  const isBuying = !!editedProductId;

  const selectedProduct = productsCtx.products.find(
    (product) => product.id === editedProductId
  );

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(productData) {
    setIsSubmitting(true);
    try {
      const id = await storeProduct(productData);
      productsCtx.addProduct({ ...productData, id: id });
      navigation.goBack();
    } catch (error) {
      setError("Could not save data - please try again later");
      setIsSubmitting(false);
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isBuying ? "Adicionar" : "Novo Produto",
    });
  }, [navigation, isBuying]);

  return (
    <View>
      <ProductForm
        headerTitle={isBuying ? "Adicionar ao Carrinho" : "Novo Produto"}
        submitButtonLabel={isBuying ? "Adicionar" : "Cadastrar"}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedProduct}
      />
    </View>
  );
}

export default ManageProduct;
