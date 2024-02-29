// from react
import { useEffect } from "react";

// react router
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";

// layouts \\
import MainLayout from "./layouts/MainLayout";

// pages \\
import HomePage from "./pages/HomePage";
import SingleProduct from "./pages/SingleProduct";
import ProductsListPage from "./pages/ProductsListPage";
// import DashboardPage from "./pages/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage";
import CategoriesPage from "./pages/CategoriesPage";
import NoInternetPage from "./pages/NoInternetPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";

// for redux
import { useSelector } from "react-redux";
import { RootStateType } from "./app/store";
import { useDispatch } from "./hooks/useDispatch";

// action makers
import { removeFavorites } from "./features/favoritesSlice";
import { getCartItems, resetCart } from "./features/cartSlice";
import { getProducts } from "./features/productListSlice";
import { getCategories } from "./features/categoriesSlice";
import { getUsers } from "./features/userSlice";

const App = () => {
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (navigator.onLine && currentUser) {
      dispatch(getProducts());
      dispatch(getCategories());
    }
  }, [currentUser]);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    if (currentUser && productsList.length) {
      console.log(currentUser);
      console.log(productsList);

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
        <Route index element={currentUser ? <HomePage /> : <LoginPage />} />

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
              <LoginPage />
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
              <LoginPage />
            )
          }
        />

        {/* <Route
          path="/dashboard"
          element={currentUser ? <DashboardPage /> : <LoginPage />}
        /> */}

        <Route
          path="/singleProduct/:id"
          element={currentUser ? <SingleProduct /> : <LoginPage />}
        />

        <Route
          path="/categories/:category"
          element={currentUser ? <CategoriesPage /> : <LoginPage />}
        />

        <Route
          path="/profile"
          element={currentUser ? <ProfilePage /> : <LoginPage />}
        />

        <Route
          path="*"
          element={currentUser ? <NotFoundPage /> : <LoginPage />}
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
