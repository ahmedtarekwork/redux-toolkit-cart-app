// redux
import { useDispatch, useSelector } from "react-redux";

// redux actions and thunks
import { addToCart } from "../app/features/cartSlice";
import { addToFavorites } from "../app/features/favoritesSlice";

// types
import { RootStateType } from "../app/store";
import { CartItemType, productType } from "../types";

const useGetProductData = (prdId: string | undefined | null) => {
  if (!prdId) throw new Error("id is required");

  const dispatch = useDispatch();

  const product = useSelector((state: RootStateType) =>
    state.products.productsList.find((prd) => prd.id.toString() === prdId)
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
