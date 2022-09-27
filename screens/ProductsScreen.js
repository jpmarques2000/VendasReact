import { useContext, useEffect, useState } from "react";

import ProductsOutput from "../components/ProductsOutput/ProductsOutput";
import { ProductsContext } from "../store/products-context";
import { fetchProducts } from "../util/http";

// const DUMMY_PRODUCTS = [
//   {
//     id: "e1",
//     description: "Coca Cola",
//     price: 5.99,
//     imageUrl: "https://st.depositphotos.com/1024764/1918/i/600/depositphotos_19186871-stock-photo-aluminum-red-can-of-coca.jpg",
//   },
//   {
//     id: "e2",
//     description: "Picanha",
//     price: 89.29,
//     imageUrl: "https://images.tcdn.com.br/img/img_prod/756961/picanha_am_argentina_miglio_15kg_r_64_00_49_2_20200228143155.jpeg",
//   },
//   {
//     id: "e3",
//     description: "Barra de Chocolate",
//     price: 5.99,
//     imageUrl: "https://media.istockphoto.com/photos/chocolate-bar-with-path-picture-id157419404?k=20&m=157419404&s=612x612&w=0&h=YrJ28kAz2du8OA9yHpWTtj1H42cyBzJrOxfVwXX3Gew=",
//   },
//   {
//     id: "e4",
//     description: "Danone",
//     price: 4.99,
//     imageUrl:
//       "https://us-southeast-1.linodeobjects.com/storage/storage-sandbox/media/uploads/produto/iogurte_danone_gar_morango_900g_937859a5-fb2e-4281-a1d1-6d897cee670c.jpeg",
//   },
//   {
//     id: "e5",
//     description: "Bolacha",
//     price: 2.59,
//     imageUrl: "https://ibassets.com.br/ib.item.image.large/l-2d11b54c0f0f47f88614fc5716487cc3.jpeg",
//   },
// ];

function ProductsScreen() {
  const [error, setError] = useState();

  const productsCtx = useContext(ProductsContext);

  useEffect(() => {
    async function getProducts() {
      try {
        const products = await fetchProducts();
        productsCtx.setProduct(products);
      } catch (error) {
        setError(
          "Não foi possível obter os produtos tente novamente mais tarde"
        );
      }
    }
    getProducts();
  });

  return <ProductsOutput products={productsCtx.products} />;
}

export default ProductsScreen;
