// from react
import { useEffect } from "react";

// react router
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";

// layouts \\
import MainLayout from "./layouts/MainLayout";

// pages \\
import HomePage from "./pages/HomePage";
import SingleProduct from "./pages/SingleProduct";
import ProductsListPage from "./pages/ProductsListPage";
import CategoriesPage from "./pages/CategoriesPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";

// error pages
import NotFoundPage from "./pages/error/NotFoundPage";
import NoInternetPage from "./pages/error/NoInternetPage";

// redux
import { useSelector } from "react-redux";
import { RootStateType } from "./app/store";
import { useDispatch } from "./hooks/useDispatch";

// redux action and thunks
import { removeFavorites } from "./app/features/favoritesSlice";
import { resetCart, getCartItems } from "./app/features/cartSlice";
import { getProducts } from "./app/features/productListSlice";
import { getCategories } from "./app/features/categoriesSlice";
import { getUsers } from "./app/features/userSlice";

const App = () => {
  const dispatch = useDispatch();

  // states
  const currentUser = useSelector(
    (state: RootStateType) => state.users.currentUser
  );
  const { cartItems, loading } = useSelector(
    (state: RootStateType) => state.cart
  );
  const favoritesList = useSelector(
    (state: RootStateType) => state.favorites.favoritesList
  );
  const { productsList } = useSelector(
    (state: RootStateType) => state.products
  );

  // useEffects
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    if (navigator.onLine && currentUser) {
      dispatch(getProducts());
      dispatch(getCategories());
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser && productsList.length) {
      dispatch(
        getCartItems({
          userId: currentUser.id,
          productsList,
        })
      );
    }
  }, [currentUser, productsList]);

  if (!navigator.onLine) return <Route path="/" element={<NoInternetPage />} />;

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route
          index
          element={
            currentUser ? (
              <HomePage />
            ) : (
              <Navigate to="/login" relative="path" />
            )
          }
        />

        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/cart"
          element={
            currentUser ? (
              <ProductsListPage
                loading={loading}
                deleteAllBtn={{
                  isDeleteAllBtn: true,
                  deleteAllProductsFunc: () => dispatch(resetCart()),
                }}
                itemsType="cartItem"
                products={cartItems}
                directionOfList="horizontal"
              />
            ) : (
              <Navigate to="/login" relative="path" />
            )
          }
        />

        <Route
          path="/favorites"
          element={
            currentUser ? (
              <ProductsListPage
                loading={false}
                deleteAllBtn={{
                  isDeleteAllBtn: true,
                  deleteAllProductsFunc: () => dispatch(removeFavorites()),
                }}
                itemsType="cartItemWithoutQTY"
                pageTitle="Your Favorites"
                products={favoritesList}
                directionOfList="horizontal"
              />
            ) : (
              <Navigate to="/login" relative="path" />
            )
          }
        />

        <Route
          path="/singleProduct/:id"
          element={
            currentUser ? (
              <SingleProduct />
            ) : (
              <Navigate to="/login" relative="path" />
            )
          }
        />

        <Route
          path="/categories/:category"
          element={
            currentUser ? (
              <CategoriesPage />
            ) : (
              <Navigate to="/login" relative="path" />
            )
          }
        />

        <Route
          path="/profile"
          element={
            currentUser ? (
              <ProfilePage />
            ) : (
              <Navigate to="/login" relative="path" />
            )
          }
        />

        <Route
          path="*"
          element={
            currentUser ? (
              <NotFoundPage />
            ) : (
              <Navigate to="/login" relative="path" />
            )
          }
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
