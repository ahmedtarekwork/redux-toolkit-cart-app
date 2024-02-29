import Loading from "../components/Loading";
import ProductsList, {
  Props as ProductsListProps,
} from "../components/ProductsList";

type Props =
  | {
      pageTitle?: string;
      loading: boolean;
    } & ProductsListProps;

const ProductsListPage = ({
  products,
  itemsType,
  deleteAllBtn,
  directionOfList,
  loading,
  pageTitle = "Your Cart",
}: Props) => {
  return loading ? (
    <Loading />
  ) : (
    <>
      <h2>{pageTitle}</h2>

      <ProductsList
        directionOfList={directionOfList}
        deleteAllBtn={deleteAllBtn}
        products={products}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        itemsType={itemsType as any}
      />
    </>
  );
};
export default ProductsListPage;
