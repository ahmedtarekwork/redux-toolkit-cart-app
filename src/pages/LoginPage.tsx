// react
import { FormEvent, useRef, useState } from "react";

// react-router-dom
import { useNavigate } from "react-router-dom";

// redux
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../app/features/userSlice.ts";

// components
import Loading from "../components/Loading";

// type
import { RootStateType } from "../app/store";

const LoginPage = () => {
  const navigate = useNavigate();

  const [formErr, setFormErr] = useState("");

  const dispatch = useDispatch();

  // refs
  const usersListRef = useRef<HTMLUListElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // states
  const { users, loading, error } = useSelector(
    (state: RootStateType) => state.users
  );

  if (loading) return <Loading />;
  if (error)
    return (
      <h2>{error || "Something went wrong, refresh the page and try again"}</h2>
    );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const usernameInp = usernameRef.current;
    const passwordInp = passwordRef.current;
    const formInputs = [usernameInp, passwordInp];

    if (Boolean(usernameInp?.value) && Boolean(passwordInp?.value)) {
      formInputs.forEach((inp) => inp?.classList.remove("red"));

      const user = users.find(({ username, password }) => {
        if (
          usernameInp?.value === username &&
          passwordInp?.value === password
        ) {
          return true;
        }
      });

      if (user) {
        dispatch(setCurrentUser(user));
        navigate("/", { relative: "path" });
      } else {
        setFormErr("user not found, check username and password and try again");
      }
    } else {
      formInputs.forEach((inp) => inp?.classList.toggle("red", !inp?.value));

      setFormErr("all fields required");
    }
  };

  return (
    <>
      <h1
        style={{
          marginBottom: "20px",
        }}
        className="title-with-line"
      >
        Sign in to our redux demo cart app
      </h1>

      <form autoComplete="off" onSubmit={handleSubmit}>
        <input
          ref={usernameRef}
          type="username"
          name="username"
          id="username"
          placeholder="username"
        />
        <input
          ref={passwordRef}
          type="password"
          name="password"
          id="password"
          placeholder="password"
        />
        <button className="full">Login</button>

        <p className={"err-msg " + (formErr ? "active" : "")}>{formErr}</p>
      </form>

      <p className="instructions">
        click on any user from the next list to choose it, you can change your
        chice after chooseing first time, then click on login button from
        previos form, you can also type username and password directly for some
        user and check if it's true of false, if it true you will go to home
        page.
      </p>

      <ul className="login-page-users-list" ref={usersListRef}>
        <h3 className="title-with-line">sign in as:</h3>
        {users.map(
          ({ id, name: { firstname, lastname }, username, password }) => (
            <li key={id}>
              <button
                onClick={(e) => {
                  if (usersListRef.current) {
                    [...usersListRef.current.children].forEach((child) => {
                      const btn = child.querySelector("button");

                      // if the btn is clicked one ? disable it : remove disable from it
                      if (btn) btn.disabled = btn === e.currentTarget;
                    });
                  }

                  const usernameInp = usernameRef.current;
                  const passwordInp = passwordRef.current;

                  if (usernameInp && passwordInp) {
                    usernameInp.value = username;
                    passwordInp.value = password;
                  }
                }}
                className="full"
              >
                "{`${firstname} ${lastname}`}"
              </button>
            </li>
          )
        )}
      </ul>
    </>
  );
};
export default LoginPage;
