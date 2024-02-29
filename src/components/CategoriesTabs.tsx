import { useSelector } from "react-redux";
import { RootStateType } from "../app/store";
import { NavLink } from "react-router-dom";

const CategoriesTabs = () => {
  const { categories, loading, error } = useSelector(
    (state: RootStateType) => state.categoires
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>something went wrong!</p>;

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
export default CategoriesTabs;
