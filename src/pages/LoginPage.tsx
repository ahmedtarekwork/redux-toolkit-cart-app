import { FormEvent, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootStateType } from "../app/store";
import { setCurrentUser } from "../features/userSlice.ts";

import Loading from "../components/Loading";

const LoginPage = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const { users, loading, error } = useSelector(
    (state: RootStateType) => state.users
  );

  if (loading) return <Loading />;
  if (error)
    return <h2>Something went wrong, refresh the page and try again</h2>;

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
      } else {
        throw new Error(
          "user not found, check username and password and try again"
        );
      }

      console.log(user);
    } else {
      formInputs.forEach((inp) => inp?.classList.toggle("red", !inp?.value));

      throw new Error("all fields required");
    }
  };

  return (
    <main
      className="center-content"
      style={{
        padding: "20px",
        minHeight: "100vh",
      }}
    >
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
      </form>
    </main>
  );
};
export default LoginPage;
