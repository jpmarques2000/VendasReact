import axios from "axios";

const BACKEND_URL =
  "https://react-native-curso-9927b-default-rtdb.firebaseio.com/";

export async function storeProduct(productData) {
  console.log(productData)

  const response = await axios.post(
    BACKEND_URL + "/products.json",
    productData
  );
  const id = response.data.name;
  return id;
}

export async function fetchProducts() {
  const response = await axios.get(BACKEND_URL + "/products.json");

  const products = [];

  for (const key in response.data) {
    const productObj = {
      id: key,
      amount: response.data[key].amount,
      description: response.data[key].description,
      image: response.data[key].image,
    };
    products.push(productObj);
  }
  return products;
}

export function updateProduct(id, productData) {
  return axios.put(BACKEND_URL + `/products/${id}.json`, productData);
}

export function deleteProduct(id) {
  return axios.delete(BACKEND_URL + `/products/${id}.json`);
}
