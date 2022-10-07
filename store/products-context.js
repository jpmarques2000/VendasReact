import { createContext, useReducer } from "react";

export const ProductsContext = createContext({
  products: [],
  addProduct: ({ description, amount, image }) => {},
  setProduct: (products) => {},
  deleteProduct: (id) => {},
  updateProduct: (id, { description, amount, image }) => {},
  addToCart: (id, { description, amount, image }) => {},
});

function productsReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "SET":
      const inverted = action.payload.reverse();
      return inverted;
    case "UPDATE":
      const updatableProductsIndex = state.findIndex(
        (products) => products.id === action.payload.id
      );
      const updatableProducts = state[updatableProductsIndex];
      const updatedItem = { ...updatableProducts, ...action.payload.data };
      const updatedProducts = [...state];
      updatedProducts[updatableProductsIndex] = updatedItem;
      return updatedProducts;
    case "ADDCART":
      const cartProductsIndex = state.findIndex(
        (products) => products.id === action.payload.id
      );
      const cartProducts = state[updatableProductsIndex];
      const CartItem = { ...cartProducts, ...action.payload.data };
      const cartProductsList = [...state];
      cartProductsList[cartProductsIndex] = CartItem;
      return cartProductsList;
    case "DELETE":
      return state.filter((products) => products.id !== action.payload);
    default:
      return state;
  }
}

function ProductsContextProvider({ children }) {
  const [productsState, dispatch] = useReducer(productsReducer, []);

  function addProduct(productsData) {
    dispatch({ type: "ADD", payload: productsData });
  }

  function setProduct(products) {
    dispatch({ type: "SET", payload: products });
  }

  function deleteProduct(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateProduct(id, productsData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: productsData } });
  }

  function addToCart(id, productsData) {
    dispatch({ type: "ADDCART", payload: { id: id, data: productsData } });
  }

  const value = {
    products: productsState,
    setProduct: setProduct,
    addProduct: addProduct,
    deleteProduct: deleteProduct,
    updateProduct: updateProduct,
    addToCart: addToCart,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

export default ProductsContextProvider;
