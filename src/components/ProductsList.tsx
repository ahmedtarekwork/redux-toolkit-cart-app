import ProductItem from "./ProductItem";
import { CartItemType } from "../types";
import { productType } from "../features/productListSlice";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa6";

type DeleteAllBtn = {
  deleteAllBtn:
    | {
        isDeleteAllBtn: false;
      }
    | {
        isDeleteAllBtn: true;
        deleteAllProductsFunc: () => void;
      };
};

type ListType =
  | {
      itemsType: "cartItem";
      products: CartItemType[];
    }
  | {
      itemsType: "cartItemWithoutQTY" | "homePageProduct";
      products: productType[];
    };

export type Props = DeleteAllBtn &
  ListType & {
    directionOfList: "horizontal" | "vertical";
  };

const ProductsList = ({
  products,
  itemsType,
  deleteAllBtn,
  directionOfList,
}: Props) => {
  if (!products.length)
    return (
      <>
        <h2>No Items In This List To Show</h2>
        <Link to="/">Continue Shopping</Link>
      </>
    );

  return (
    <>
      <ul className={`${directionOfList}-list`}>
        {directionOfList === "horizontal" && (
          <li className="list-head">
            <p className="image-cell">image</p>
            <p>name</p>
            <p>price</p>
            {itemsType === "cartItem" && <p>qty</p>}
            <p>delete</p>
          </li>
        )}

        {products.map((item) => (
          <ProductItem key={item.id} itemType={itemsType} product={item} />
        ))}
      </ul>

      {deleteAllBtn.isDeleteAllBtn && directionOfList === "horizontal" ? (
        <button
          className="full remove-all-list-btn"
          onClick={deleteAllBtn.deleteAllProductsFunc}
        >
          <div className="content">
            <FaTrash />
            remove all list
          </div>
        </button>
      ) : null}
    </>
  );
};
export default ProductsList;
