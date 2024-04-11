// redux
import { useSelector } from "react-redux";

// components
import Loading from "../components/Loading";
import CategoriesTabs from "../components/CategoriesTabs";
import ProductsList from "../components/ProductsList";

// types
import { RootStateType } from "../app/store";

const HomePage = () => {
  const { productsList, loading, error } = useSelector(
    (state: RootStateType) => state.products
  );

  if (loading) return <Loading />;
  if (error) return <h2>{error}</h2>;

  return (
    <>
      <section className="home-page-top-section">
        <h2 className="home-page-title title-with-line">
          Hello In My Redux Cart App
        </h2>

        <CategoriesTabs />
      </section>

      <h3 className="title-with-line">All products that we have:</h3>
      <ProductsList
        deleteAllBtn={{
          isDeleteAllBtn: false,
        }}
        itemsType="homePageProduct"
        products={productsList}
        directionOfList="vertical"
      />
    </>
  );
};
export default HomePage;
