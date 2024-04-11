// react
import { ChangeEvent, MouseEvent, ReactNode, useEffect, useRef } from "react";

// react-router-dom
import { Link } from "react-router-dom";

// hooks
import useGetProductData from "../hooks/useGetProductData";

// redux
import { useDispatch } from "react-redux";

// redux actions and thunks
import { editItemInCart, removeFromCart } from "../app/features/cartSlice";
import { removeFromFavorites } from "../app/features/favoritesSlice";

// icons
import { FaCheck, FaRegHeart, FaHeart, FaTrash } from "react-icons/fa";

// types
import { CartItemType, productType } from "../types";

type Props =
  | {
      itemType: "homePageProduct" | "cartItemWithoutQTY";
      product: productType;
    }
  | { itemType: "cartItem"; product: CartItemType };

const ProductItem = (props: Props) => {
  // refs
  const deleteBtnRef = useRef<HTMLButtonElement>(null);

  const {
    itemType,
    product: { title, price, id, category, description, image, rating },
  } = props;

  const { isInCart, isInFav, addProductToCart, addProductToFav } =
    useGetProductData(id);
  const dispatch = useDispatch();

  const item: productType = {
    title,
    price,
    id,
    category,
    description,
    image,
    rating,
  };

  const handleChangeQty = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(editItemInCart({ ...item, qty: +e.currentTarget.value }));
  };

  const handleDeleteFromCart = () => {
    itemType === "cartItem" &&
      dispatch(removeFromCart({ ...item, qty: props.product.qty }));
  };

  const handleDeleteFromFavorites = () => {
    dispatch(removeFromFavorites(item));
  };

  const handleToggleToFavorites = (e: MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.classList.toggle("active");

    if (e.currentTarget.classList.contains("active")) addProductToFav(item);
    else {
      dispatch(removeFromFavorites(item));
    }
  };

  let className: "product-card" | "cart-item" = "cart-item";

  let theChildren: ReactNode;
  if (itemType === "cartItem" || itemType === "cartItemWithoutQTY") {
    theChildren = (
      <>
        {itemType === "cartItem" && (
          <input
            className="cart-item-qty"
            min={1}
            defaultValue={props.product.qty}
            type="number"
            onChange={handleChangeQty}
          />
        )}

        <div className="delete-btn-holder">
          <button
            ref={deleteBtnRef}
            className="delete-cart-item fit"
            onClick={
              itemType === "cartItem"
                ? handleDeleteFromCart
                : handleDeleteFromFavorites
            }
          >
            <FaTrash />
          </button>
        </div>
      </>
    );
  } else if (itemType === "homePageProduct") {
    className = "product-card";

    theChildren = (
      <>
        <>
          <button
            className={`add-product-to-favorites ${isInFav ? " active" : ""}`}
            onClick={handleToggleToFavorites}
          >
            <FaHeart className="fill" />
            <FaRegHeart className="stroke" />
          </button>

          {isInCart && (
            <p>
              <FaCheck /> item in cart
            </p>
          )}

          <div className="product-card-btns-holder">
            <Link className="view-product" to={`/singleProduct/${id}`}>
              view product
            </Link>

            {isInCart ? (
              <Link to="/cart">show your cart</Link>
            ) : (
              <button
                className="add-to-cart full"
                onClick={() => addProductToCart({ ...item, qty: 1 })}
              >
                add product to cart
              </button>
            )}
          </div>
        </>
      </>
    );
  }

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      const btn = deleteBtnRef.current;

      if (btn) {
        const parent = btn.parentElement;

        if (window.innerWidth <= 510) {
          btn.classList.remove("fit");
          btn.classList.add("full");
          btn.style.paddingBlock = "10px";

          parent?.style.setProperty("width", "100%");
        } else {
          btn.classList.add("fit");
          btn.classList.remove("full");

          parent?.style.removeProperty("width");
        }
      }
    });
    observer.observe(document.documentElement);

    return () => observer.disconnect();
  }, []);

  return (
    <li id={id} className={className}>
      <div className="img-holder">
        <img src={image} alt={title} />
      </div>
      <Link to={`/singleProduct/${id}`} className="no-style product-card-title">
        {title}
      </Link>
      <p className="cart-item-price">{price}$</p>
      {theChildren}
    </li>
  );
};
export default ProductItem;
