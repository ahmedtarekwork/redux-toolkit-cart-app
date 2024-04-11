// react
import { useEffect, useRef } from "react";
// react-router-dom
import { Outlet, useLocation } from "react-router-dom";
// redux
import { useSelector } from "react-redux";

// components
import Header from "../components/Header";

// types
import { RootStateType } from "../app/store";

const MainLayout = () => {
  const { pathname } = useLocation();

  const headerRef = useRef<HTMLElement>(null);
  const mainElRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  const setHeightOfMainEl = () => {
    if (headerRef.current && mainElRef.current && footerRef.current) {
      mainElRef.current.style.minHeight = `calc(100vh - ${
        headerRef.current.offsetHeight + footerRef.current.offsetHeight
      }px)`;
    }
  };

  useEffect(() => {
    if (pathname === "/login" && mainElRef.current) {
      mainElRef.current.classList.add("center-content");
      mainElRef.current.style.cssText = `
      padding-block: 20px;
      min-height: 100vh`;

      return () => {
        mainElRef.current?.classList.remove("center-content");

        ["padding-block", "min-height"].forEach((p) =>
          mainElRef.current?.style.removeProperty(p)
        );
      };
    } else {
      setHeightOfMainEl();

      const watcher = new ResizeObserver(setHeightOfMainEl);
      watcher.observe(document.documentElement);

      return () => watcher.unobserve(document.documentElement);
    }
  }, [pathname]);

  const user = useSelector((state: RootStateType) => state.users.currentUser);

  const main = (
    <main className="container" ref={mainElRef}>
      <Outlet />
    </main>
  );

  return user ? (
    <>
      <Header ref={headerRef} />

      {main}

      <footer ref={footerRef}>
        <div className="container">
          made by{" "}
          <a target="_blank" href="https://github.com/ahmedtarekwork">
            ahmed tarek
          </a>
        </div>
      </footer>
    </>
  ) : (
    main
  );
};
export default MainLayout;
