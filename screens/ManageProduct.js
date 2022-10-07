import { useContext, useLayoutEffect, useState } from "react";

import ProductForm from "../components/ManageProducts/ProductForm";
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
      if (isBuying) {
        productsCtx.addToCart(editedProductId, productData);
      } else {
        const id = await storeProduct(productData);
        productsCtx.addProduct({ ...productData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError("Could not save data - please try again later");
      setIsSubmitting(false);
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isBuying ? "Adicionar ao Carrinho" : "Novo Produto",
    });
  }, [navigation, isBuying]);

  return (
    <View>
      <ProductForm
        submitButtonLabel={isBuying ? "Adicionar" : "Cadastrar"}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedProduct}
      />
    </View>
  );
}
