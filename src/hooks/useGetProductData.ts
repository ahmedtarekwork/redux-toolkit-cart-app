import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "../app/store";

import { addToCart } from "../features/cartSlice";
import { addToFavorites } from "../features/favoritesSlice";
import { CartItemType } from "../types";
import { productType } from "../features/productListSlice";

const useGetProductData = (prdId: string | undefined | null) => {
  if (!prdId) throw new Error("id is required");

  const dispatch = useDispatch();

  const product = useSelector((state: RootStateType) =>
    state.products.productsList.find((prd) => prd.id === prdId)
  );

  const isInCart = useSelector((state: RootStateType) =>
    state.cart.cartItems.some((item) => item.id === prdId)
  );

  const isInFav = useSelector((state: RootStateType) =>
    state.favorites.favoritesList.some((item) => item.id === prdId)
  );

  const addProductToCart = (prd: CartItemType) => {
    dispatch(addToCart(prd));
  };
  const addProductToFav = (prd: productType) => {
    dispatch(addToFavorites(prd));
  };

  return { product, isInCart, isInFav, addProductToCart, addProductToFav };
};
export default useGetProductData;
