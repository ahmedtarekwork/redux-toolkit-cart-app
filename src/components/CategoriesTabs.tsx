// react-router-dom
import { NavLink, useLocation } from "react-router-dom";
// redux
import { useSelector } from "react-redux";

// types
import { RootStateType } from "../app/store";

const CategoriesTabs = () => {
  const { pathname } = useLocation();

  const { categories, loading, error } = useSelector(
    (state: RootStateType) => state.categoires
  );

  if (loading) return <p>Loading Categories...</p>;
  if (error)
    return (
      <p
        style={{
          marginTop: 10,
        }}
      >
        {error || "something went wrong!"}
      </p>
    );

  const List = () => {
    return (
      <ul className="categories">
        {categories.map((cat) => (
          <li key={cat}>
            <NavLink to={`/categories/${cat}`}>{cat}</NavLink>
          </li>
        ))}
      </ul>
    );
  };

  return pathname === "/" ? (
    <div className="cats-tabs-holder">
      <h3>Take a look on our Categories</h3>

      <List />
    </div>
  ) : (
    <List />
  );
};
export default CategoriesTabs;
