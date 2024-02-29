import { useSelector } from "react-redux";
import { RootStateType } from "../app/store";

import Loading from "../components/Loading";
import CategoriesTabs from "../components/CategoriesTabs";
import ProductsList from "../components/ProductsList";

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

        <div className="cats-tabs-holder">
          <h3>Take a look on our Categories</h3>
          <CategoriesTabs />
        </div>
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
