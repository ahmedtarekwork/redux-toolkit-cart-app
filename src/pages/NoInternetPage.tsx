import { useEffect } from "react";
import { FaWifi } from "react-icons/fa";

const NoInternetPage = () => {
  useEffect(() => {
    const mainEl = document.querySelector("main");

    if (mainEl) {
      mainEl.classList.add("center-content");

      return () => {
        mainEl.classList.remove("center-content");
      };
    }
  }, []);
  return (
    <>
      <FaWifi
        className="center"
        style={{
          fontSize: "200px",
          maxWidth: "100%",
        }}
      />

      <h1
        style={{
          marginBottom: "15px",
          textAlign: "center",
        }}
      >
        No Internet Connection!
      </h1>
      <button onClick={() => location.reload()}>try again</button>
    </>
  );
};
export default NoInternetPage;
