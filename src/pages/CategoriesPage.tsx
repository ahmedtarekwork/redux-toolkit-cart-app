// react
import { ReactNode, useEffect, useRef } from "react";

// react-router-dom
import { useParams, useLocation } from "react-router-dom";

// redux
import { useSelector } from "react-redux";
import { useDispatch } from "../hooks/useDispatch";

// redux thunks
import {
  getCategories,
  getCategoryProducts,
} from "../app/features/categoriesSlice";

// components
import Loading from "../components/Loading";
import ProductsList from "../components/ProductsList";
import CategoriesTabs from "../components/CategoriesTabs";

// types
import { RootStateType } from "../app/store";

const CategoriesPage = () => {
  const { category } = useParams();
  const location = useLocation();

  const dispatch = useDispatch();
  const {
    categories,
    loading,
    error,
    productsError,
    productsLoading,
    categoryProducts,
  } = useSelector((state: RootStateType) => state.categoires);

  const initRender = useRef(0);

  useEffect(() => {
    !categories.length && dispatch(getCategories());
  }, []);

  // get products from specific category
  useEffect(() => {
    if (initRender.current === 0) {
      category && dispatch(getCategoryProducts(category));
    } else {
      dispatch(
        getCategoryProducts(location.pathname.split("/").slice(-1).toString())
      );
    }

    initRender.current += 1;
  }, [location]);

  if (!category) return <h2>category: {category} not found</h2>;
  if (loading) return <Loading />;
  if (error) return <h2>{error}</h2>;

  let productsChild: ReactNode;
  if (productsLoading) {
    productsChild = <Loading />;
  } else {
    if (productsError) productsChild = <h2>{error}</h2>;
    else {
      if (categoryProducts.length) {
        productsChild = (
          <ProductsList
            deleteAllBtn={{
              isDeleteAllBtn: false,
            }}
            itemsType="homePageProduct"
            products={categoryProducts}
            directionOfList="vertical"
          />
        );
      } else {
        productsChild = <h2>no products in {category} category</h2>;
      }
    }
  }

  return (
    <>
      <CategoriesTabs />
      <div className="categories-products">{productsChild}</div>
    </>
  );
};
export default CategoriesPage;
