import { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  useEffect(() => {
    const mainEl = document.querySelector(".main-app-holder") as HTMLElement;
    mainEl?.classList.add("center-content");

    return () => {
      mainEl?.classList.remove("center-content");
    };
  }, []);
  return (
    <>
      <h2
        style={{
          marginBottom: "15px",
        }}
      >
        This Page Not Found
      </h2>
      <Link to="/">Go Back To Home Page</Link>
    </>
  );
};
export default NotFoundPage;
