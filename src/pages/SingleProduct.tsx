import { Link, useParams } from "react-router-dom";
import useGetProductData from "../hooks/useGetProductData";
import Star from "../components/Star";

const SingleProduct = () => {
  const { id } = useParams();

  const { product, isInCart, isInFav, addProductToCart, addProductToFav } =
    useGetProductData(id);

  if (!product) {
    return (
      <>
        <h2>sorry, product with ID: "{id}" not found!</h2>
        <Link to="/">back to home page</Link>
      </>
    );
  }

  const {
    title,
    price,
    category,
    image,
    description,
    rating: { count: ratersCount, rate },
  } = product;

  const rateArr = rate.toString().split(".");

  return (
    <>
      <div className="product-data-holder">
        <div className="data-holder">
          <h2>{title}</h2>
          <p>{price}$</p>

          <p className="category-cell">
            category :
            <Link className="fit" to={`/categories/${category}`}>
              {category}
            </Link>
          </p>

          <div className="description">
            <h3>Description</h3>
            <p>{description}</p>
          </div>

          <div className="rating">
            <h3>Rating : {rate}</h3>
            <div className="stars">
              {Array.from({ length: +rateArr[0] }, (_, i) => {
                return <Star percent={100} key={i} />;
              })}

              {+rateArr[0] < 5 ? <Star percent={+rateArr[1] * 10} /> : null}

              {Array.from({ length: 5 - (+rateArr[0] + 1) }, (_, i) => {
                return <Star percent={0} key={i} />;
              })}
            </div>
            <p>useres who rated this: {ratersCount} user</p>
          </div>
        </div>

        <div className="img-holder">
          <img src={image} alt="product-img" />
        </div>
      </div>

      <div className="single-product-btns-holder">
        {isInCart ? (
          <Link to="/cart">view cart</Link>
        ) : (
          <button onClick={() => addProductToCart({ ...product, qty: 1 })}>
            add to cart
          </button>
        )}

        {isInFav ? (
          <Link to="/favorites">view favorites</Link>
        ) : (
          <button onClick={() => addProductToFav(product)}>
            add to favorites
          </button>
        )}
      </div>
    </>
  );
};
export default SingleProduct;
