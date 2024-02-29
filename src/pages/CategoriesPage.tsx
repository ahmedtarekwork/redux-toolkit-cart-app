import { useSelector } from "react-redux";
import { useDispatch } from "../hooks/useDispatch";
import { RootStateType } from "../app/store";
import Loading from "../components/Loading";
import { useParams, useLocation } from "react-router-dom";
import {
  getCategories,
  getCategoryProducts,
} from "../features/categoriesSlice";
import { ReactNode, useEffect, useRef } from "react";
import ProductsList from "../components/ProductsList";
import CategoriesTabs from "../components/CategoriesTabs";

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
    console.log(categories);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    !categories.length && dispatch(getCategories() as any);
  }, []);

  // get products from specific category
  useEffect(() => {
    if (initRender.current === 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      category && dispatch(getCategoryProducts(category) as any);
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
