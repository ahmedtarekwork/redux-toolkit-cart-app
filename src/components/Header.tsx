// react
import { useRef, forwardRef, LegacyRef } from "react";

// react-router-dom
import { Link } from "react-router-dom";

// redux
import { useSelector, useDispatch } from "react-redux";
// redux actions
import { logoutCurrentUser } from "../app/features/userSlice";

// icons
import { FaCartShopping, FaHeart, FaUser } from "react-icons/fa6";
import { ImExit } from "react-icons/im";

// types
import { RootStateType } from "../app/store";

const Header = (_: unknown, ref: unknown) => {
  const headerRef = useRef<HTMLElement>(null);
  const dispatch = useDispatch();

  return (
    <header ref={(ref as LegacyRef<HTMLElement>) || headerRef}>
      <div className="container">
        <Link to="/" className="no-style">
          <h1>Redux Cart App</h1>
        </Link>

        <nav>
          <button onClick={() => dispatch(logoutCurrentUser())}>
            <ImExit />
          </button>

          <Link className="popup-number" to="/cart">
            <div className="popup-element">
              {useSelector(
                (state: RootStateType) => state.cart.cartItemsLength
              )}
            </div>
            <FaCartShopping />
          </Link>

          <Link to="/favorites">
            <FaHeart />
          </Link>

          <Link to="/profile">
            <FaUser />
          </Link>
        </nav>
      </div>
    </header>
  );
};
export default forwardRef<HTMLElement, object>(Header);
