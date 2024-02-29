import { Link } from "react-router-dom";
import { FaCartShopping, FaHeart, FaUser } from "react-icons/fa6";
import { MdSpaceDashboard } from "react-icons/md";
import { ImExit } from "react-icons/im";
import { useRef, forwardRef, LegacyRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootStateType } from "../app/store";
import { logoutCurrentUser } from "../features/userSlice";

const Header = (_: unknown, ref: unknown) => {
  const headerRef = useRef<HTMLElement>(null);
  const dispatch = useDispatch();

  return (
    <header ref={(ref as LegacyRef<HTMLElement>) || headerRef}>
      <Link to="/" className="no-style">
        <h1>Redux Cart App</h1>
      </Link>

      <nav>
        <button onClick={() => dispatch(logoutCurrentUser())}>
          <ImExit />
        </button>

        <Link className="popup-number" to="/cart">
          <div className="popup-element">
            {useSelector((state: RootStateType) => state.cart.cartItemsLength)}
          </div>
          <FaCartShopping />
        </Link>

        <Link to="/favorites">
          <FaHeart />
        </Link>

        <Link to="/dashboard">
          <MdSpaceDashboard />
        </Link>

        <Link to="/profile">
          <FaUser />
        </Link>
      </nav>
    </header>
  );
};
export default forwardRef<HTMLElement, object>(Header);
